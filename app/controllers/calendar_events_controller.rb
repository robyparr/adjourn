class CalendarEventsController < ApplicationController
  def index
    events = current_user.google_accounts.map do |account|
      account.google_calendars.map do |calendar|
        GoogleService::CalendarEvent.new(account, calendar.google_id).all
      end
    end.flatten.sort_by { |it| it[:start] }

    render partial: 'index.html', locals: { events: events }
  end
end
