class ContactsController < ApplicationController
  def index
    @contacts = current_user.contacts
      .includes(:meeting_attendees)
      .order(:email)
      .page(params[:page])
  end

  def autocomplete
    autocomplete_email = params[:email].downcase
    matching_contacts =
      current_user.contacts
        .where("email LIKE ?", "%#{autocomplete_email}%")
        .limit(10)
        .select(:id, :email)

    render json: matching_contacts
  end
end
