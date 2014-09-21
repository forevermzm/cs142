class AddPasswordToUsers < ActiveRecord::Migration
  def change
    add_column :users, :password_digest, :string
    add_column :users, :salt, :string 

    User.reset_column_information

    User.all.each do |user|
        require 'digest/sha1'
        user.salt = SecureRandom.hex
        user.password_digest= Digest::SHA1.hexdigest(user.salt + user.login)
        user.password = user.login
        user.save()
    end
  end
end
