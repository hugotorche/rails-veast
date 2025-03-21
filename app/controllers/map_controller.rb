class MapController < ApplicationController
    def index
      @map_points = MapPoint.all
    end
end
