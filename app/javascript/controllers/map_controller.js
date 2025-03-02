import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    markers: { type: Array, default: [] },
    center: { type: Array, default: [0, 0] },
    zoom: { type: Number, default: 2 }
  }

  async connect() {
    await this.loadLeaflet();
    this.initializeMap();
    this.configureIconDefaults();
    this.createMapInstance();
    this.addBaseLayer();
    this.placeMarkers();
  }

  async loadLeaflet() {
    const { default: L } = await import('leaflet');
    window.L = L;
    this.leaflet = L;
  }

  configureIconDefaults() {
    this.leaflet.Icon.Default.mergeOptions({
      iconUrl: '/assets/images/leaflet/marker-icon.png',
      iconRetinaUrl: '/assets/images/leaflet/marker-icon-2x.png',
      shadowUrl: '/assets/images/leaflet/marker-shadow.png'
    });
  }

  createMapInstance() {
    this.map = this.leaflet.map(this.element, {
      zoomControl: false,
      attributionControl: false
    }).setView(this.centerValue, this.zoomValue);

    this.leaflet.control.zoom({ position: 'topright' }).addTo(this.map);
  }

  addBaseLayer() {
    this.leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    }).addTo(this.map);
  }

  placeMarkers() {
    this.markersValue.forEach(data => {
      const marker = this.leaflet.marker(data.coords)
        .addTo(this.map)
        .bindPopup(data.popup || '');

      if (data.draggable) {
        marker.dragging.enable();
        marker.on('drag', this.handleMarkerDrag);
      }
    });
  }

  disconnect() {
    if (this.map) {
      this.map.eachLayer(layer => layer.remove());
      this.map.off();
      this.map.remove();
    }
  }

  handleMarkerDrag = (e) => {
    const marker = e.target;
  };
}
