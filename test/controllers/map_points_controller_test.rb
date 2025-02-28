require "test_helper"

class MapPointsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @map_point = map_points(:one)
  end

  test "should get index" do
    get map_points_url
    assert_response :success
  end

  test "should get new" do
    get new_map_point_url
    assert_response :success
  end

  test "should create map_point" do
    assert_difference("MapPoint.count") do
      post map_points_url, params: { map_point: { city: @map_point.city, country: @map_point.country, date: @map_point.date, object: @map_point.object } }
    end

    assert_redirected_to map_point_url(MapPoint.last)
  end

  test "should show map_point" do
    get map_point_url(@map_point)
    assert_response :success
  end

  test "should get edit" do
    get edit_map_point_url(@map_point)
    assert_response :success
  end

  test "should update map_point" do
    patch map_point_url(@map_point), params: { map_point: { city: @map_point.city, country: @map_point.country, date: @map_point.date, object: @map_point.object } }
    assert_redirected_to map_point_url(@map_point)
  end

  test "should destroy map_point" do
    assert_difference("MapPoint.count", -1) do
      delete map_point_url(@map_point)
    end

    assert_redirected_to map_points_url
  end
end
