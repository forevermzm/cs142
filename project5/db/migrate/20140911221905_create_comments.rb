class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
        t.integer :photo_id
        t.integer :user_id
        t.date :date_time
        t.text :comment
        t.timestamps
    end
  end
end
