import { Controller } from "@hotwired/stimulus"
import "leaflet-css"

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
    this.configureIconPaths()
    this.createBaseMap()
    this.registerCleanup()
  }

  // Add new method for markers
  addMarkers() {
    this.markersValue.forEach(markerData => {
      const marker = this.L.marker(markerData.coords)
        .addTo(this.map)
        .bindPopup(markerData.popup || '');

      if (markerData.openPopup) {
        marker.openPopup();
      }
    });
  }

  configureIconPaths() {
    const iconBase = '<%= asset_path("leaflet/") %>';
    this.L.Icon.Default.mergeOptions({
      iconUrl: `${iconBase}marker-icon.png`,
      iconRetinaUrl: `${iconBase}marker-icon-2x.png`,
      shadowUrl: `${iconBase}marker-shadow.png`
    });
  }

  async initializeLeaflet() {
    const { default: L } = await import('leaflet')
    this.L = L
    delete L.Icon.Default.prototype._getIconUrl
  }

  configureIconPaths() {
    this.L.Icon.Default.mergeOptions({
      iconUrl: '<%= asset_path("leaflet/marker-icon.png") %>',
      iconShadowUrl: '<%= asset_path("leaflet/marker-shadow.png") %>'
    })
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