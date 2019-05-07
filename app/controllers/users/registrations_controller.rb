class Users::RegistrationsController < Devise::RegistrationsController
  layout "guest"

  before_action :set_application_layout!, only: %i(edit update)
  before_action :configure_permitted_parameters

  private
    def set_application_layout!
      self.class.layout 'application'
    end

  protected
    # The path used after sign up for inactive accounts.
    def after_inactive_sign_up_path_for(resource)
      super(resource)
      :new_user_session
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: %i(time_zone))
      devise_parameter_sanitizer.permit(:account_update, keys: %i(time_zone))
    end
end
