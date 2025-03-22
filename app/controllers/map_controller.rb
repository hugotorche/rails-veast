class MapController < ApplicationController
  before_action :authenticate_user!
    def index
      @map_points = current_user.map_points.order(start_date: :asc)
    end
end
