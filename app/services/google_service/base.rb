module GoogleService
  class Base
    def initialize(google_account)
      @google_account = google_account
      @client = GoogleService.client(refresh_token: @google_account.refresh_token)
    end

    def get_access_token!
      return @access_token if token_valid?

      token_response = @client.fetch_access_token!
      @token_expires_at = Time.zone.now + token_response["expires_in"].to_i.seconds
      @access_token = token_response["access_token"]
    end

    private

    def token_valid?
      @token_expires_at && @token_expires_at > Time.zone.now
    end
  end
end