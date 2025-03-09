class MapController < ApplicationController
    def map
        import { Controller } from "@hotwired/stimulus"
        import L from 'leaflet'
        import '@elfalem/leaflet-curve';
        export default class extends Controller {
        // Map logic goes here
        }
    end
end
