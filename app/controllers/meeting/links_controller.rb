#typed: false
class Meeting::LinksController < ApplicationController
  def index
    @current_meeting = meeting
    @links = @current_meeting.links.preload(:from_meeting, :to_meeting)
    render 'index.json'
  end

  def create
    @current_meeting = meeting
    @link = Meeting::Link.link_meetings(@current_meeting, to_meeting, link_type: params[:link][:link_type])

    if @link.save
      render 'show.json'
    else
      render json: @link.errors.full_message, status: :unprocessable_entity
    end
  end

  def destroy
    link = current_user.meeting_links.find(params[:id])
    link.destroy
    render json: { message: 'Link sucessfully removed.' }
  end

  private

  def meeting
    current_user.meetings.find(params[:meeting_id])
  end

  def to_meeting
    current_user.meetings.find(params[:link][:to_meeting_id])
  end
end
