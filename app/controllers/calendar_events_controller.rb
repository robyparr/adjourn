class CalendarEventsController < ApplicationController
  def index
    has_google_accounts = false
    has_synced_calendars = false

    events = current_user.google_accounts.map do |account|
      has_google_accounts = true
      account.google_calendars.map do |calendar|
        has_synced_calendars = true
        GoogleService::CalendarEvent.new(account, calendar.google_id).all
      end
    end
      .flatten
      .reject { |it| current_user.meetings.where(google_event_id: it[:id]).any? }
      .sort_by { |it| it[:start] }

    render partial: 'index.html', locals: {
      has_google_accounts: has_google_accounts,
      has_synced_calendars: has_synced_calendars,
      events: events
    }
  end

  def create
    account = current_user.google_accounts.find params[:google_account_id]
    event = GoogleService::CalendarEvent.new(account, params[:calendar_id])
      .find(params[:event_id])

    meeting = current_user.meetings.create(
      title: event[:summary],
      start_date: event[:start],
      end_date: event[:end],
      google_event_id: event[:id]
    )

    event[:attendees].each { |attendee| meeting.add_attendee(attendee) }

    redirect_to meeting_url(meeting),
      notice: "Added meeting from Google Calendar."
  end
end
