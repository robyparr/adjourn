module GoogleService
  class Calendar < GoogleService::Base
    include HTTParty
    base_uri 'https://www.googleapis.com/calendar'

    def all
      params = { "access_token" => get_access_token! }
      response = self.class.get("/v3/users/me/calendarList", query: params)
      response["items"].map do |item|
        {
          google_id: item["id"],
          name: item["summary"],
          account_id: @google_account.id
        }
      end
    end
  end
end