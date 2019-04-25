class AttendeesController < ApplicationController

  before_action :load_meeting, except: [:autocomplete]
  
  def autocomplete
    matching_attendees = current_user.attendees.where(
      "email LIKE ?",
      "%#{params[:email].downcase}%"
    ).limit(10)
    .select(:id, :email)

    render json: matching_attendees
  end

  def attend
    add_attendee = @meeting.add_attendee params[:email]

    return render(json: add_attendee) if add_attendee.respond_to? :email
    render json: { message: add_attendee }, status: :unprocessable_entity
  end

  def remove
    attendee = current_user.attendees.find_by_email params[:email]
    @meeting.attendees.delete attendee
    render json: { message: 'Attendee sucessfully removed.' }
  end


  private

  def load_meeting
    @meeting = current_user.meetings.find(params[:id])
  end

end
