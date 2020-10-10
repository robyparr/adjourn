# typed: false
class GoogleAccountsController < ApplicationController
  def index
    @accounts = current_user.google_accounts
  end

  def new
    google_auth = GoogleService::Authorization.new(callback_google_accounts_url)
    redirect_to google_auth.authorization_url
  end

  def create
    google_auth = GoogleService::Authorization.new(callback_google_accounts_url)
    token = google_auth.authorize!(params["code"])

    current_user.google_accounts.build(refresh_token: token).tap do |account|
      user_info = GoogleService::UserInfo.new(account).user_info

      account.email = user_info["email"]
      account.avatar_url = user_info["picture"]
      account.save
    end

    redirect_to google_accounts_path
  end

  def destroy
    account = current_user.google_accounts.find(params[:id])
    account.destroy

    redirect_to google_accounts_path, notice: 'Your Google account has been removed from Adjourn.'
  end
end
