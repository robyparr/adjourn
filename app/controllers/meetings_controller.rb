class MeetingsController < ApplicationController
  def index
    @meeting = Meeting.new
    @meetings = current_user
      .meetings
      .order(start_date: :desc)
      .page(params[:page])
  end

  def show
    @meeting = current_user.meetings
      .includes(
        { agenda: [:notes, :uploads] },
        :action_items, 
        :attendees
      )
      .find(params[:id])
  end

  def new
    @meeting = Meeting.new
  end

  def create
    meeting = current_user.meetings.build(meeting_params)
    meeting.start_date = Time.zone.now
    meeting.end_date = meeting.start_date + 1.hours

    if meeting.save
      render json: { resource_url: meeting_url(meeting) }, status: :created
    else
      render json: { errors: meeting.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def update
    meeting = current_user.meetings.find(params[:id])

    if meeting.update_attributes(meeting_params)
      render json: meeting
    else
      render json: meeting.errors.full_messages, status: :unprocessable_entity
    end
  end

  def email_attendees
    meeting = current_user.meetings.find(params[:id])

    if meeting.attendees.any?
      MeetingMailer.attendees_email(meeting.id).deliver_later
      render json: { message: t('meetings.email_attendees.success_message') }
    else
      error_message = t('meetings.email_attendees.error_no_attendees')
      render json: { error: error_message }, status: :unprocessable_entity
    end
  end

  def destroy
    meeting = current_user.meetings.find(params[:id])
    meeting.destroy

    flash[:notice] = "Meeting successfully deleted."
    redirect_to meetings_path
  end

  def search
    @results = PgSearch.multisearch(params[:q])
      .where(user_id: current_user.id)
      .includes(searchable: :meeting)

    render 'search.json'
  end

  private

  def meeting_params
    params.require(:meeting).permit(
      :id,:title, :description,
      :start_date, :end_date, :created_at,
      :updated_at
    )
  end
end
