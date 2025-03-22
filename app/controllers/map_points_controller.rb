class MapPointsController < ApplicationController
  before_action :set_map_point, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, except: [:index, :show]
  before_action :correct_user, only: [:edit, :update, :destroy]

  # GET /map_points or /map_points.json
  def index
    @map_points = MapPoint.all
    @map_points_sorted = MapPoint.all.order(start_date: :asc)
  end

  # GET /map_points/1 or /map_points/1.json
  def show
  end

  # GET /map_points/new
  def new
    #@map_point = MapPoint.new
    @map_point = current_user.map_points.build
  end

  # GET /map_points/1/edit
  def edit
  end

  # POST /map_points or /map_points.json
  def create
    #@map_point = MapPoint.new(map_point_params)
    @map_point = current_user.map_points.build(map_point_params)

    respond_to do |format|
      if @map_point.save
        format.html { redirect_to @map_point, notice: "Map point was successfully created." }
        format.json { render :show, status: :created, location: @map_point }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @map_point.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /map_points/1 or /map_points/1.json
  def update
    respond_to do |format|
      if @map_point.update(map_point_params)
        format.html { redirect_to @map_point, notice: "Map point was successfully updated." }
        format.json { render :show, status: :ok, location: @map_point }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @map_point.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /map_points/1 or /map_points/1.json
  def destroy
    @map_point.destroy!

    respond_to do |format|
      format.html { redirect_to map_points_path, status: :see_other, notice: "Map point was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def correct_user
    @map_point = current_user.map_points.find_by(id: params[:id])
    redirect_to map_points_path, notice: "Not Authorized To Edit This Point" if @map_point.nil?
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_map_point
      @map_point = MapPoint.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def map_point_params
      params.expect(map_point: [ :country, :city, :latitude, :longitude, :start_date, :end_date, :short_description, :long_description, :user_id ])
    end
end
