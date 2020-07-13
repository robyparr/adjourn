class CalendarEventsController < ApplicationController
  def index
    calendar_events_hash = current_user.load_calendar_events
    render partial: 'index.html', locals: calendar_events_hash
  end

  def create
    account = current_user.google_accounts.find(params[:google_account_id])
    event = GoogleService::CalendarEvent.new(account, params[:calendar_id]).find(params[:event_id])

    meeting =
      current_user.meetings.create(
        title: event[:summary],
        start_date: event[:start],
        end_date: event[:end],
        google_event_id: event[:id]
      )

    event[:attendees].each { |attendee| meeting.add_attendee(attendee) }

    redirect_to meeting_url(meeting), notice: 'Added meeting from Google Calendar.'
  end
end
