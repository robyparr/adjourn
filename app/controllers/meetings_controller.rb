class MeetingsController < ApplicationController

  # GET /meetings
  # List all meetings.
  def index
    @meetings = current_user.meetings.order(start_date: :desc)
  end

  # GET /meetings/:id
  # Show a specific meeting
  def show
    @meeting = current_user.meetings
                           .includes(
                             { agenda: :notes }, 
                             :action_items, 
                             :attendees
                           )
                           .order('agendums.created_at ASC')
                           .find(params[:id])
  end
  

  # GET /meetings/new
  # New meeting form.
  def new
    @meeting = Meeting.new
  end

  # POST /meetings
  # Create a new meeting.
  def create
    meeting = current_user.meetings.build(meeting_params)

    if meeting.save
      render json: meeting, status: :created
    else
      render json: meeting.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH /meetings/:id
  # Update an existing meeting.
  def update
    meeting = current_user.meetings.find(params[:id])

    if meeting.update_attributes(meeting_params)
      render json: meeting
    else
      render json: meeting.errors.full_messages, status: :unprocessable_entity
    end
  end

  def email_attendees
    meeting = current_user.meetings.find(params[:meeting_id])
    MeetingMailer.attendees_email(meeting).deliver_later

    render json: { message: 'Email successfully sent.' }
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
