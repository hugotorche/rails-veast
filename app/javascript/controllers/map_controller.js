import { Controller } from "@hotwired/stimulus";
import "leaflet-css";

export default class extends Controller {
  static values = {
    center: {
      type: Array,
      default: [0, 0]
    },
    zoom: { type: Number, default: 5 }
  }

  async connect() {
    await this.initializeLeaflet()
    this.createBaseMap()
    this.addMarker()
    this.registerCleanup()
  }

  async initializeLeaflet() {
    const { default: L } = await import('leaflet')
    this.L = L
    delete L.Icon.Default.prototype._getIconUrl
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
    
    const officeIcon = new this.L.Icon({
      iconUrl: 'https://img.icons8.com/officexs/16/100-percents.png',
      iconSize: [16, 16],
    });

    var bdxMarker = this.L.marker([44.8361, -0.5808], {icon: officeIcon}).addTo(this.map)
    .bindPopup('Bordeaux');

    var prsMarker = this.L.marker([48.8647, 2.3490], {icon: officeIcon}).addTo(this.map)
    .bindPopup('Paris');

    var cphMarker = this.L.marker([55.6760, 12.5683], {icon: officeIcon}).addTo(this.map)
    .bindPopup('Copenhagen');

    var gveMarker = this.L.marker([46.2044, 6.1432], {icon: officeIcon}).addTo(this.map)
    .bindPopup('Geneva');

    var tyoMarker = this.L.marker([35.6528, 139.8394], {icon: officeIcon}).addTo(this.map)
    .bindPopup('Tokyo');
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
