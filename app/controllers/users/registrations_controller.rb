# typed: false
class Users::RegistrationsController < Devise::RegistrationsController
  layout :action_layout
  before_action :configure_permitted_parameters

  private
    def action_layout
      case action_name
      when 'edit', 'update' then 'application'
      else 'guest'
      end
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
