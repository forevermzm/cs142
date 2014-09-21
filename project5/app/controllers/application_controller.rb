class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def loggedIn
    return session[:current_user_id]
  end

  def loginFirst
    flash[:error] = "Please log in first!"
    redirect_to(:controller => 'users', :action => :login)
  end
end
