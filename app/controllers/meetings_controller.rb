class MeetingsController < ApplicationController

  # GET /meetings
  # List all meetings.
  def index
    @meetings = Meeting.all
  end

end
