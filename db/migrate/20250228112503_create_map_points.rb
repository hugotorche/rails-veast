class CreateMapPoints < ActiveRecord::Migration[8.0]
  def change
    create_table :map_points do |t|
      t.string :country
      t.string :city
      t.decimal :latitude, precision: 9, scale: 6
      t.decimal :longitude, precision: 9, scale: 6
      t.date :start_date
      t.date :end_date
      t.string :short_description
      t.string :long_description

      t.timestamps
    end
  end
end
