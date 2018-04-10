module GoogleService
  class Authorization
    def initialize(callback_url)
      @callback_url = callback_url
      @client = GoogleService.client(callback_url: callback_url)
    end

    def authorization_url
      @client.authorization_uri.to_s
    end

    def authorize!(code)
      @client.code = code
      @client.fetch_access_token!
      @client.refresh_token
    end
  end
end