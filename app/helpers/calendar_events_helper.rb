# typed: true
module CalendarEventsHelper
  def add_event_url(event)
    calendar_events_url(
      google_account_id: event[:google_account_id],
      calendar_id: event[:calendar_id],
      event_id: event[:id]
    )
  end
end
