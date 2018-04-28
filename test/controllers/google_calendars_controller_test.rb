require 'test_helper'

class GoogleCalendarsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @google_account = google_accounts(:one)
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
    assert_difference 'GoogleCalendar.count', -1 do
      delete google_calendars_url, params: {
        google_id: google_calendars(:one).google_id,
        google_account_id: @google_account.id
      }
    end
    assert_response :success
  end
end
