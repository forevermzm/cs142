class PhotosController < ApplicationController

    def new

    end

    def uploadPhoto
        require 'fileutils'
        name =  params[:upload].tempfile
        directory = "app/assets/images"
        # create the file path
        path = File.join(directory, params[:upload].original_filename)
        # write the file
        # File.open(path, "wb") { |f| f.write(upload) }
        FileUtils.cp name.path, path

        photo = Photo.new
        photo.user_id = session[:current_user_id]
        photo.date_time = DateTime.now
        photo.file_name = params[:upload].original_filename
        photo.save

        redirect_to(:controller => 'users', :action => 'show', :id => session[:current_user_id])
    end

end