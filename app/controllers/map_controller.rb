class MapController < ApplicationController
  before_action :authenticate_user!, only: :index
  
    def index
      @map_points = current_user.map_points.order(start_date: :asc)
    end

    def demo
      @map_points_2 = MapPoint.where(user_id: 1).order(start_date: :asc)
    end

end
