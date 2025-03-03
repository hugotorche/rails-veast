import { Controller } from "@hotwired/stimulus";
import "leaflet-css";

export default class extends Controller {
  static values = {
    center: {
      type: Array,
      default: [0, 0]
    },
    zoom: { type: Number, default: 2 }
  }

  async connect() {
    await this.initializeLeaflet()
    this.createBaseMap()
    this.configureIconPaths()
    this.addMarker()
    this.registerCleanup()
  }

  async initializeLeaflet() {
    const { default: L } = await import('leaflet')
    this.L = L
    delete L.Icon.Default.prototype._getIconUrl
  }

  configureIconPaths() {
    this.L.Icon.Default.mergeOptions({
      iconUrl: new URL(
        "/assets/images/leaflet/marker-icon.png", 
        import.meta.url
      ).href,
      iconRetinaUrl: new URL(
        "/assets/images/leaflet/marker-icon-2x.png",
        import.meta.url
      ).href,
      shadowUrl: new URL(
        "/assets/images/leaflet/marker-shadow.png",
        import.meta.url
      ).href,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }

  createBaseMap() {
    this.map = this.L.map(this.element, {
      zoomControl: false,
      attributionControl: false
    }).setView(this.centerValue, this.zoomValue)

    this.L.control.zoom({ position: 'topright' }).addTo(this.map)
    
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(this.map)
  }

  addMarker() {
    var marker1 = this.L.marker([46.2044, 6.1432]).addTo(this.map)
    .bindPopup('Geneva');

    var marker2 = this.L.marker([55.6761, 12.5683]).addTo(this.map)
      .bindPopup('Copenhagen');

    var point1 = [55.6761, 12.5683];
    var point2 = [46.2044, 6.1432];

    var midLat = (point1[0] + point2[0]) / 2;
    var midLng = (point1[1] + point2[1]) / 2;
    var offset = 0.7;
    var ctrlPoint = [midLat + offset, midLng + offset];

    this.L.curve([
        'M', point1,
        'Q', ctrlPoint,
        point2
    ], {
        color: 'black',
        weight: 3,
        animate: {
            duration: 2000,
            iterations: Infinity,
            easing: 'ease-in-out'
        }
    }).addTo(this.map);
  }

  registerCleanup() {
    this.element.addEventListener('turbo:before-cache', () => {
      if (this.map) this.map.remove()
    })
  }

  disconnect() {
    if (this.map) {
      this.map.off()
      this.map.remove()
      this.map = null
    }
  }
}
