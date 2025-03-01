import { Controller } from "@hotwired/stimulus"
import "leaflet-css"

export default class extends Controller {
  static values = {
    center: { type: Array, default: [51.505, -0.09] },
    zoom: { type: Number, default: 13 }
  }

  async connect() {
    await this.initializeLeaflet()
    this.configureIconPaths()
    this.createBaseMap()
    this.registerCleanup()
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
