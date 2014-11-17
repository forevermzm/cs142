class Photo < ActiveRecord::Base
    belongs_to :user
    has_many :comments
    has_many :tags

    def self.upload(upload)

    end
end
