# typed: false
class MeetingsController < ApplicationController
  def index
    @meeting = Meeting.new
    @meetings = current_user.meetings.order(start_date: :desc).page(params[:page])
  end

  def show
    includes = [
      { agenda: %i[notes uploads] },
      { action_items: %i[contacts] },
      { attendees: %i[contact] },
    ]
    @meeting = current_user.meetings.includes(*includes).find(params[:id])
  end

  def create
    meeting = current_user.meetings.build(meeting_params)
    meeting.start_date = Time.zone.now
    meeting.end_date = meeting.start_date + 1.hours

    if meeting.save
      meeting.add_attendee current_user.email
      render json: { resource_url: meeting_url(meeting) }, status: :created
    else
      render json: { errors: meeting.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    meeting = current_user.meetings.find(params[:id])

    if meeting.update(meeting_params)
      render json: meeting
    else
      render json: meeting.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    meeting = current_user.meetings.find(params[:id])
    meeting.destroy

    flash[:notice] = 'Meeting successfully deleted.'
    redirect_to meetings_path
  end

  def search
    @results =
      PgSearch.multisearch(params[:q])
        .where(user_id: current_user.id)
        .includes(searchable: :meeting)

    render 'search.json'
  end

  def name_search
    @results = current_user.meetings.where('title ILIKE ?', "%#{params[:q].to_s}%")
    render 'name_search.json'
  end

  def download
    exporter = MeetingExporter.new(params[:id])
    send_data exporter.to_pdf,
      filename: "#{exporter.meeting.title.gsub(' ', '_')}.pdf",
      type: 'application/pdf',
      disposition: 'inline'
  end

  private

  def meeting_params
    params.require(:meeting).permit(
      :id,
      :title,
      :description,
      :start_date,
      :end_date,
      :created_at,
      :updated_at,
    )
  end
end
