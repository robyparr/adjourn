class Users::RegistrationsController < Devise::RegistrationsController
  layout "guest"
  before_action :set_application_layout!, only: %i(edit update)

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
end
