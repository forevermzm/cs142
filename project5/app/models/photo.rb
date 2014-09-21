class Photo < ActiveRecord::Base
    belongs_to :user
    has_many :comments

    def self.upload(upload)

    end
end
