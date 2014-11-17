class TagsController < ApplicationController

    def new
        tag = Tag.new
        tag.user_id = params[:user_id];
        tag.photo_id = params[:photo_id];
        tag.coor_x = params[:coorX];
        tag.coor_y = params[:coorY];
        tag.width = params[:width];
        tag.height = params[:height];

        tag.save

        redirect_to(:controller => 'users', :action => 'index')
    end
end