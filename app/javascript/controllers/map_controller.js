import { Controller } from "@hotwired/stimulus";
import "leaflet-css";
//import "leaflet-curve";
//import { rf } from './utils/read_file.js';

export default class extends Controller {
  static values = {
    center: {
      type: Array,
      default: [0, 0]
    },
    zoom: { type: Number, default: 3 }
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
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);
  }

  addMarker() {
    
    const officeIcon = new this.L.Icon({
      iconUrl: 'https://img.icons8.com/small/16/152238/100-percents.png',
      iconSize: [16, 16],
    });

    const mapElement = document.getElementById('map-container');
    const mapPoints = JSON.parse(mapElement.dataset.mapPoints);
    const src = mapElement.dataset.popImg;

    mapPoints.forEach((point) => {
      const marker = this.L.marker([point.latitude, point.longitude], { icon: officeIcon }).addTo(this.map);
      marker.bindPopup(`<h4>${point.city}, ${point.country}</h4>${point.short_description}`);
    });
    
    const popupContent = document.createElement("div");
    popupContent.innerHTML = "<img src='" + src + "' style='width: 150px; height: auto;'><br>"
                              + "<a target='_blank' href='" + src + "'>See the image</a>";

    fetch('/utils/pop_up.html')
      .then(response => response.text())
      .then(htmlContent => {
        tyoMarker.bindPopup(htmlContent);
      });
    
    const pointList = mapPoints.map(point => [point.latitude, point.longitude]);

    const polyline = this.L.polyline(pointList, {
      color: '#B8860B',
      weight: 2,
      opacity: 0.8
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
      color: '#ff9999',
      weight: 2,
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
