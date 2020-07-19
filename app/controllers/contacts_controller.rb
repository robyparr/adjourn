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

  def attend
    @attendee = meeting.add_attendee params[:email]

    if @attendee.persisted?
      render 'show.json'
    else
      render json: { errors: @attendee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def remove
    meeting.remove_attendee params[:email]
    render json: { message: 'Attendee sucessfully removed.' }
  end

  private

  def meeting
    @meeting ||= current_user.meetings.find(params[:id])
  end
end
