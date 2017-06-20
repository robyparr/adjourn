class MeetingsController < ApplicationController

  # GET /meetings
  # List all meetings.
  def index
    @meetings = Meeting.all
  end

  # GET /meetings/:id
  # Show a specific meeting
  def show
    @meeting = Meeting.includes(:agenda).find(params[:id])
  end
  

  # GET /meetings/new
  # New meeting form.
  def new
    @meeting = Meeting.new
  end

  # POST /meetings
  # Create a new meeting.
  def create
    meeting = Meeting.new(meeting_params)

    if meeting.save
      render json: meeting, status: :created
    else
      render json: meeting.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH /meetings/:id
  # Update an existing meeting.
  def update
    meeting = Meeting.find(params[:id])

    if meeting.update_attributes(meeting_params)
      render json: meeting
    else
      render json: meeting.errors.full_messages, status: :unprocessable_entity
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
