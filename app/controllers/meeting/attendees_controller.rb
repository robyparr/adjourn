class Meeting::AttendeesController < ApplicationController
  def create
    @attendee = meeting.add_attendee params[:email]

    if @attendee.persisted?
      render 'show.json'
    else
      render json: { errors: @attendee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @attendee = meeting.attendees.find(params[:id])

    if @attendee.update update_attendee_params
      render 'show.json'
    else
      render json: { errors: @attendee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    meeting.remove_attendee params[:email]
    render json: { message: 'Attendee sucessfully removed.' }
  end

  def email
    if meeting.attendees.any?
      MeetingMailer.attendees_email(meeting.id).deliver_later
      render json: { message: t('meetings.email_attendees.success_message') }
    else
      error_message = t('meetings.email_attendees.error_no_attendees')
      render json: { error: error_message }, status: :unprocessable_entity
    end
  end

  private

  def meeting
    @meeting ||= current_user.meetings.find(params[:meeting_id])
  end

  def update_attendee_params
    params.require(:attendee).permit(:attended)
  end
end
