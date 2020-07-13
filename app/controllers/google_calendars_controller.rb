class GoogleCalendarsController < ApplicationController
  layout false

  def index
    @calendars = GoogleService::Calendar.new(google_account).all
    calendars_to_sync = GoogleCalendar.by_account(google_account)
    @calendars.each do |calendar|
      calendar[:sync] =
        calendars_to_sync
          .select { |it| it.google_id == calendar[:google_id] }
          .any?
    end
  end

  def create
    google_account.google_calendars.create google_id: params[:google_id]
    render json: { message: 'success' }
  end

  def destroy
    calendar = google_account.google_calendars.find_by(google_id: params[:google_id])
    calendar.destroy

    render json: { message: 'success' }, code: :destroyed
  end

  private

  def google_account
    @google_account ||= current_user.google_accounts.find(params[:google_account_id])
  end
end
