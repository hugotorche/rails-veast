class AddUserIdToMapPoints < ActiveRecord::Migration[8.0]
  def change
    add_column :map_points, :user_id, :integer
    add_index :map_points, :user_id
  end
end
