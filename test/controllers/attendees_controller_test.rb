require 'test_helper'

class AttendeesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @meeting = meetings(:one)
    @autocomplete_params = { email: 'attendee' }
    @attend_existing_params = { email: attendees(:one).email }
    @attend_new_params = { email: 'attendee3@example.com' }
  end

  # Autocomplete tests
  test "guests can't access atendees autocomplete" do
    get attendee_autocomplete_url, params: @autocomplete_params
    assert_redirected_to new_user_session_url
  end

  test "user can autocomplete his attendees" do
    sign_in @user

    get attendee_autocomplete_url, params: @autocomplete_params
    assert_response :success

    result = JSON.parse(response.body)
    assert_equal 1, result.size
    assert_equal attendees(:one).email, result.first['email']
  end

  #  Attend tests
  test "guests can't add attendees to a meeting" do
    assert_no_difference [
      '@meeting.attendees.count',
      '@user.attendees.count'
    ] do
      post attend_meeting_url(@meeting),
        params: @attend_existing_params
      
      assert_redirected_to new_user_session_url
    end
  end

  test "users can't add attendees to another user's meeting" do
    sign_in users(:two)

    assert_no_difference [
      '@meeting.attendees.count',
      '@user.attendees.count'
    ] do
      post attend_meeting_url(@meeting),
        params: @attend_existing_params
      
      assert_response :not_found
    end
  end

  test "an existing attendee can attend a meeting" do
    sign_in @user

    assert_difference '@meeting.attendees.count', 1 do
      assert_no_difference '@user.attendees.count' do
        post attend_meeting_url(@meeting),
          params: @attend_existing_params
          
        assert_response :success
      end
    end
  end

  test "a new attendee can attend a meeting" do
    sign_in @user

    assert_difference [
      '@meeting.attendees.count',
      '@user.attendees.count'
    ], 1 do
      post attend_meeting_url(@meeting), params: @attend_new_params
      assert_response :success
    end
  end

  test "an attendee can't attend a meeting twice" do
    sign_in @user

    post attend_meeting_url(@meeting), params: @attend_existing_params
    assert_response :success

    assert_no_difference ['@meeting.attendees.count', 'Attendee.count'] do
      post attend_meeting_url(@meeting),
        params: @attend_existing_params

      assert_response :unprocessable_entity
    end
  end

  # Removal tests
  test "guests can't remove attendees from a meeting" do
    assert_no_difference [
      '@meeting.attendees.count',
      '@user.attendees.count'
    ] do
      delete unattend_meeting_url(@meeting),
        params: @attend_existing_params
      
      assert_redirected_to new_user_session_url
    end
  end

  test "users can't deleete attendees of another user's meeting" do
    sign_in users(:two)

    assert_no_difference [
      '@meeting.attendees.count',
      '@user.attendees.count'
    ] do
      delete unattend_meeting_url(@meeting),
        params: @attend_existing_params
      
      assert_response :not_found
    end
  end

  test "an attendee can be removed from a meeting" do
    sign_in @user

    @meeting.attendees << attendees(:one)

    assert_difference '@meeting.attendees.count', -1 do
      assert_no_difference ['@user.attendees.count', 'Attendee.count'] do
        delete unattend_meeting_url(@meeting),
          params: @attend_existing_params

        assert_response :success
      end
    end
  end
end
