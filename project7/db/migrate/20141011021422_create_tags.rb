class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
        t.integer :photo_id
        t.integer :user_id
        t.integer :coor_x
        t.integer :coor_y
        t.integer :width
        t.integer :height
        t.timestamps
    end
  end
end
