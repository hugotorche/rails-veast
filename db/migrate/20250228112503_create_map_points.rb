class CreateMapPoints < ActiveRecord::Migration[8.0]
  def change
    create_table :map_points do |t|
      t.string :country
      t.string :city
      t.date :date
      t.string :object

      t.timestamps
    end
  end
end
