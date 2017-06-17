class MeetingsController < ApplicationController

  # GET /meetings
  # List all meetings.
  def index
    @meetings = Meeting.all
  end

  # GET /meetings/new
  # New meeting form.
  def new
    @meeting = Meeting.new
  end

  # POST /meetings
  # Create a new meeting
  def create
    meeting = Meeting.new(meeting_params)

    if meeting.save
      render json: meeting
    else
      render json: meeting.errors, status: :unprocessable_entity
    end
  end

  private
  
  def meeting_params
    params
    .require(:meeting)
      .permit(
        :id,
        :title, 
        :description,
        :start_date, 
        :end_date,
        :created_at,
        :updated_at
      )
  end
  
end
