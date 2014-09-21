class User < ActiveRecord::Base
    has_many :photos
    has_many :comments

    attr_accessor :password

    def password_valid? password
        salt = self.salt
        password_digest = self.password_digest
        return password_digest == Digest::SHA1.hexdigest(salt + password)
    end

    before_save :encrypt_password
    after_save :clear_password

    def encrypt_password
        require 'digest/sha1'
        if password.present?
            self.salt = SecureRandom.hex
            self.password_digest= Digest::SHA1.hexdigest(self.salt + password)
        end
    end

    def clear_password
      self.password = nil
    end

    def self.login(login_name)
        user = User.find(:all, :conditions => {:login => login_name})
        if user then
            return user[0]
        else 
            return false
        end
    end
end
