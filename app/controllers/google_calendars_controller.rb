class GoogleCalendarsController < ApplicationController
  layout false

  before_action :load_google_account

  def index
    @calendars = GoogleService::Calendar.new(@account).all
    calendars_to_sync = GoogleCalendar.by_account(@account)
    @calendars.each do |cal|
      cal[:sync] = calendars_to_sync
        .select { |it| it.google_id == cal[:google_id] }
        .any?
    end
  end

  def create
    @account.google_calendars.create(google_id: params[:google_id])
    render json: { message: 'success' }
  end

  def destroy
    calendar = @account.google_calendars.find_by_google_id(params[:google_id])
    calendar.destroy
    render json: { message: 'success' }, code: :destroyed
  end

  private

  def load_google_account
    @account = current_user.google_accounts.find(params[:google_account_id])
  end
end
