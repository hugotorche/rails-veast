class MapController < ApplicationController
  before_action :authenticate_user!
    def index
      @map_points = MapPoint.all
    end
end
