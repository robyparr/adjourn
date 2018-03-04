class ProfileController < ApplicationController
  layout 'profile'

  def show
    @view_model = ProfileViewModel.new(current_user)
  end
end
