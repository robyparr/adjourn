require 'signet/oauth_2/client'

module GoogleService
  def self.client(refresh_token: nil, callback_url: nil)
    Signet::OAuth2::Client.new(
        authorization_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_credential_uri:  'https://www.googleapis.com/oauth2/v3/token',
        client_id: Rails.application.secrets.google_client_id,
        client_secret: Rails.application.secrets.google_client_secret,
        scope: 'email profile https://www.googleapis.com/auth/calendar.readonly',
        redirect_uri: callback_url,
        refresh_token: refresh_token)
  end
end