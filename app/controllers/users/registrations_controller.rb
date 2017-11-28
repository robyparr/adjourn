class Users::RegistrationsController < Devise::RegistrationsController

  protected
  
  # The path used after sign up for inactive accounts.
  def after_inactive_sign_up_path_for(resource)
    super(resource)
    :new_user_session
  end
end
