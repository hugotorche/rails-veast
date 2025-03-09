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

    var bdxPoint = [44.8361, -0.5808];
    var prsPoint = [48.8647, 2.3490];
    var cphPoint = [55.6760, 12.5683];
    var gvePoint = [46.2044, 6.1432];
    var tyoPoint = [35.6528, 139.8394];

    var bdxMarker = this.L.marker(bdxPoint, {icon: officeIcon}).addTo(this.map)
    .bindPopup('Bordeaux');

    var prsMarker = this.L.marker(prsPoint, {icon: officeIcon}).addTo(this.map)
    .bindPopup('Paris');

    var cphMarker = this.L.marker(cphPoint, {icon: officeIcon}).addTo(this.map)
    .bindPopup('Copenhagen');

    var gveMarker = this.L.marker(gvePoint, {icon: officeIcon}).addTo(this.map)
    .bindPopup('Geneva');

    var tyoMarker = this.L.marker(tyoPoint, {icon: officeIcon}).addTo(this.map)
    .bindPopup('Tokyo');

    // Create a polyline
    var pointList = [cphPoint, gvePoint, tyoPoint];
    var polyline = this.L.polyline(pointList, {
      color: 'red',
      weight: 3,
      opacity: 0.5
    });

    // Add the polyline to the map
    polyline.addTo(this.map);

    // Define points
    var point1 = [44.8361, -0.5808]; // Bordeaux
    var point2 = [48.8647, 2.3490]; // Paris

    // Calculate control point
    var midLat = (point1[0] + point2[0]) / 2;
    var midLng = (point1[1] + point2[1]) / 2;
    var offset = 0.5; // Adjust this value to change the curve's steepness
    var ctrlPoint = [midLat + offset, midLng];

    // Draw the curve
    var curvedPath = this.L.curve([
      'M', point1,
      'Q', ctrlPoint,
      point2
    ], {
      color: 'red',
      weight: 3,
      opacity: 0.5
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
