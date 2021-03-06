# typed: false
require 'test_helper'

class GoogleCalendarTest < ActiveSupport::TestCase
  setup do
    @account = create :google_account
    @account_cal = create :google_calendar, google_account: @account
    @non_account_cal = GoogleCalendar.where('google_account_id != ?', @account.id).first
  end

  test "by_account returns calendars only related to the passed google account" do
    calendars = GoogleCalendar.by_account(@account)

    assert_equal 1, calendars.size
    assert_equal @account_cal.id, calendars.first.id
  end
end
