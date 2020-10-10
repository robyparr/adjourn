# typed: false
require 'test_helper'

class GoogleCalendarsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = create :user
    @google_account = create :google_account, user: @user
  end

  test "guests can't access google calendars" do
    get google_calendars_url
    assert_redirected_to new_user_session_url

    assert_no_difference 'GoogleCalendar.count' do
      post google_calendars_url, params: {
        google_id: 3,
        google_account_id: @google_account.id
      }
    end
    assert_redirected_to new_user_session_url

    assert_no_difference 'GoogleCalendar.count' do
      delete google_calendars_url, params: {
        google_id: 3,
        google_account_id: @google_account.id
      }
    end
    assert_redirected_to new_user_session_url
  end

  test "creates sync record for google calendar" do
    sign_in @user
    assert_difference 'GoogleCalendar.count', 1 do
      post google_calendars_url, params: {
        google_id: 3,
        google_account_id: @google_account.id
      }
    end
    assert_response :success
  end

  test "deletes sync record for google calendar" do
    sign_in @user
    calendar = create(:google_calendar, google_account: @google_account)
    assert_difference 'GoogleCalendar.count', -1 do
      delete google_calendars_url, params: {
        google_id: calendar.google_id,
        google_account_id: @google_account.id
      }
    end
    assert_response :success
  end
end
