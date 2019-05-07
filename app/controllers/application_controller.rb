class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authenticate_user!
  around_action :set_time_zone, if: :current_user

  rescue_from ActiveRecord::RecordNotFound do |error| 
    not_found
  end
  

  def not_found
    head :not_found
  end

  def components
  end


  private

  def set_time_zone(&block)
    Time.use_zone(current_user.time_zone, &block)
  end
end
