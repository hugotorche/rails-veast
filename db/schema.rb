ActiveRecord::Schema[8.0].define(version: 2025_02_28_112503) do
  create_table "map_points", force: :cascade do |t|
    t.string "country"
    t.string "city"
    t.decimal "latitude"
    t.decimal "longitude"
    t.date "start_date"
    t.date "end_date"
    t.string "short_description"
    t.string "long_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
