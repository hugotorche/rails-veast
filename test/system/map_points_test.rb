require "application_system_test_case"

class MapPointsTest < ApplicationSystemTestCase
  setup do
    @map_point = map_points(:one)
  end

  test "visiting the index" do
    visit map_points_url
    assert_selector "h1", text: "Map points"
  end

  test "should create map point" do
    visit map_points_url
    click_on "New map point"

    fill_in "City", with: @map_point.city
    fill_in "Country", with: @map_point.country
    fill_in "Date", with: @map_point.date
    fill_in "Object", with: @map_point.object
    click_on "Create Map point"

    assert_text "Map point was successfully created"
    click_on "Back"
  end

  test "should update Map point" do
    visit map_point_url(@map_point)
    click_on "Edit this map point", match: :first

    fill_in "City", with: @map_point.city
    fill_in "Country", with: @map_point.country
    fill_in "Date", with: @map_point.date
    fill_in "Object", with: @map_point.object
    click_on "Update Map point"

    assert_text "Map point was successfully updated"
    click_on "Back"
  end

  test "should destroy Map point" do
    visit map_point_url(@map_point)
    click_on "Destroy this map point", match: :first

    assert_text "Map point was successfully destroyed"
  end
end
