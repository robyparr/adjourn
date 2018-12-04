class ProfileController < ApplicationController
  def show
    @view_model = ProfileViewModel.new(current_user)
  end
end
