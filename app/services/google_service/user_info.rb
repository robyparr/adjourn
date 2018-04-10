module GoogleService
  class UserInfo < GoogleService::Base
    include HTTParty
    base_uri 'https://www.googleapis.com/oauth2/v1'

    def user_info
      params = { "alt" => "json", "access_token" => get_access_token! }
      self.class.get("/userinfo", query: params)
    end
  end
end