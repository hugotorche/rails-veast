ActiveRecord::Schema[8.0].define(version: 2025_03_18_130911) do
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
    t.integer "user_id"
    t.index ["user_id"], name: "index_map_points_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end
end
