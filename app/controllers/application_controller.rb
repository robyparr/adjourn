class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotFound do |error| 
    not_found
  end
  

  def not_found
    head :not_found
  end
  
end
