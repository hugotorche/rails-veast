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
  
    // Import Leaflet Curve plugin
    import('@elfalem/leaflet-curve')
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

      // Define start and end points
      var point1 = [55.6761, 12.5683];
      var point2 = [46.2044, 6.1432];

      // Create a control point to define the curve
      var midLat = (point1[0] + point2[0]) / 2;
      var midLng = (point1[1] + point2[1]) / 2;
      var offset = 0.7; // Increased offset for more visible curve
      var ctrlPoint = [midLat + offset, midLng + offset];

      // Adjust map bounds to ensure curve is visible
      var bounds = this.L.latLngBounds(point1, point2);
      this.map.fitBounds(bounds);

      // Create a curved line using Quadratic Bézier curve command (Q)
      var curvedPath = this.L.curve([
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
