class AttendeesController < ApplicationController

  before_action :load_meeting, except: [:autocomplete]
  
  def autocomplete
    matching_attendees = current_user.attendees.where(
      "email LIKE ?", 
      "%#{params[:email]}%"
    )
    
    render json: matching_attendees
  end

  def attend
    attendee = current_user.attendees.find_by_email params[:email]
    attendee ||= current_user.attendees.create(email: params[:email])
    
    begin
      @meeting.attendees << attendee
    rescue ActiveRecord::RecordNotUnique
      message = 'Attendee is already attending this meeting.'
      render json: { message: message }, status: :unprocessable_entity
      return
    end

    render json: attendee
  end

  def remove
    attendee = current_user.attendees.find_by_email params[:email]
    @meeting.attendees.delete attendee
    render json: { message: 'Attendee sucessfully removed.' }
  end


  private

  def load_meeting
    @meeting = current_user.meetings.find(params[:meeting_id])
  end

end
