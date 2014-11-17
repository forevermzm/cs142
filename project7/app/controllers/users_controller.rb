class UsersController < ApplicationController
    
    def index
        if loggedIn then
            @users = User.all
        end
    end

    def login
        if loggedIn then
            redirect_to(:action => :show, :id => session[:current_user_id])
        end
    end

    def logout
        session[:current_user_id] = nil
        redirect_to(:action => :login)
    end

    def show
        if loggedIn then
            @users = User.find(:all);
            @photos = Photo.find(:all, :conditions => {:user_id => params[:id]})
        else
            loginFirst()    
        end
    end

    def post_login
        @user = User.login(params[:login])
        if @user then
            if @user.password_valid? params[:password] then 
                session[:current_user_id] = @user.id
                redirect_to(:action => :show, :id => @user.id)
            else
                flash[:error] = "Invalid Password"
                redirect_to(:action => :login)
            end
        else 
            flash[:error] = "No user: " + params[:login] + ", try again!"
            redirect_to(:action => :login)
        end
    end

    def new
        
    end

    def create
        if params[:password] == params[:password_confirmation] then
            user = User.new
            user.first_name = params[:first_name]
            user.last_name = params[:last_name]
            user.login = params[:login]
            user.password = params[:password]
            if user.save then
                session[:current_user_id] = user.id
                redirect_to(:action => :index)
            else 
                flash[:error] = "Failed to register" + params[:login] + " .Try again"
                redirect_to(:action => :new)
            end
        else 
            flash[:error] = "The password aren't matched"
            redirect_to(:action => :new)
        end
    end
end