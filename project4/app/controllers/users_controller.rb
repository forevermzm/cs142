class UsersController < ApplicationController  
    def index
        @users = User.all
    end

    def show
        @photos = Photo.find(:all, :conditions => {:user_id => params[:id]})
    end
end