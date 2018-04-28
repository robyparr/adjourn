module GoogleService
  class Calendar < GoogleService::Base
    include HTTParty
    base_uri 'https://www.googleapis.com/calendar/v3/users/me'

    def all
      params = { "access_token" => get_access_token! }
      response = self.class.get("/calendarList", query: params)
      response["items"].map do |it|
        {
          google_id: it["id"],
          name: it["summary"],
          account_id: @google_account.id
        }
      end
    end
  end
end