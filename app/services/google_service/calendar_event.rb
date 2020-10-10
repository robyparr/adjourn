# typed: true
module GoogleService
  class CalendarEvent < GoogleService::Base
    include HTTParty
    base_uri 'https://www.googleapis.com/calendar'

    def initialize(account, calendar_id)
      super(account)
      @calendar_id = calendar_id
    end

    def all
      params = {
        "access_token" => get_access_token!,
        "maxResults" => 5,
        "orderBy" => "startTime",
        "singleEvents" => true,
        "timeMin" => Time.zone.now.iso8601
      }
      response = self.class.get(
        "/v3/calendars/#{@calendar_id}/events",
        query: params
      )["items"] || []

      response.map do |item|
        {
          id: item["id"],
          summary: item["summary"],
          start: item["start"]["dateTime"] || item["start"]["date"],
          end: item["end"]["dateTime"] || item["end"]["date"],
          google_account_id: @google_account.id,
          calendar_id: @calendar_id
        }
      end
    end

    def find(event_id)
      params = {
        "access_token" => get_access_token!,
        "alwaysIncludeEmail" => "true"
      }
      response = self.class.get(
        "/v3/calendars/#{@calendar_id}/events/#{event_id}",
        query: params
      )
      return nil unless response

      attendees = [response["organizer"]["email"]]
      attendees << response["attendees"].map { |it| it["email"] } if response["attendees"]
      attendees.flatten!
      {
        id: response["id"],
        summary: response["summary"],
        attendees: attendees.uniq,
        start: response["start"]["dateTime"] || response["start"]["date"],
        end: response["end"]["dateTime"] || response["end"]["date"],
      }
    end
  end
end