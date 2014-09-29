class Comment < ActiveRecord::Base
    belongs_to :user
    belongs_to :photo

	validates :photo_id, :user_id, :date_time, :comment, :presence => true
end
