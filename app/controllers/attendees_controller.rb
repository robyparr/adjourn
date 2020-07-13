class AttendeesController < ApplicationController
  def autocomplete
    autocomplete_email = params[:email].downcase
    matching_attendees =
      current_user.attendees.where("email LIKE ?", "%#{autocomplete_email}%")
        .limit(10)
        .select(:id, :email)

    render json: matching_attendees
  end

  def attend
    meeting_attendee = meeting.add_attendee params[:email]

    if meeting_attendee.persisted?
      render json: meeting_attendee
    else
      render json: { errors: meeting_attendee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def remove
    attendee = current_user.attendees.find_by email: params[:email]
    meeting.attendees.delete attendee
    render json: { message: 'Attendee sucessfully removed.' }
  end

  private

  def meeting
    @meeting ||= current_user.meetings.find(params[:id])
  end
end
