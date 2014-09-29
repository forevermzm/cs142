class CommentsController < ApplicationController
    def new
        if loggedIn then
            @photo = Photo.find_by_id(params[:id])
            @comments = Comment.all(:conditions => {:photo_id => @photo.id})
        else 
            loginFirst()
        end
    end

    def create
        comment = Comment.new
        comment.photo_id = params[:photo_id]
        comment.user_id = params[:user_id]
        comment.date_time = DateTime.now
        comment.comment = params[:comment]
        

        if !comment.save then
            flash[:error] = "Comment cannot be empty!"
        end
        redirect_to(:action => :new)
    end

end