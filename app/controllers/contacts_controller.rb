class ContactsController < ApplicationController
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
