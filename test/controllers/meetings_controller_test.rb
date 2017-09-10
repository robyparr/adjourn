require 'test_helper'

class MeetingsControllerTest < ActionDispatch::IntegrationTest
  include ActiveJob::TestHelper
  
  def setup
    @meeting = meetings(:one)
    @meeting2 = meetings(:two)

    @user = users(:one)

    @user.meetings << @meeting
    ActionMailer::Base.deliveries.clear
  end
  
  test "can list all a user's meetings" do
    # Non authenticated user
    get meetings_path
    assert_redirected_to new_user_session_path

    # Authenticated
    sign_in @user
    get meetings_path
    assert_response :success

    meetings = assigns(:meetings)

    # Make sure all of the current user's meetings are listed
    # and meetings not belonging to the current user aren't listed.
    Meeting.all.each do |meeting|
      assert meetings.include? meeting if meeting.user == @user
      assert_not meetings.include? meeting unless meeting.user == @user
    end
  end

  test "can create a new meeting" do
    # Un authorized user
    get new_meeting_path
    assert_redirected_to new_user_session_path

    # Authorized user
    sign_in @user
    get new_meeting_path
    assert_response :success

    assert_difference ['Meeting.count', '@user.meetings.count'], 1 do
      post meetings_path, params: {
        meeting: {
          title: 'the title',
          start_date: Time.zone.now,
          end_date: Time.zone.now + 1,
          user: @user
        }
      }
    end
    assert_response :created
  end

  test "can update an existing meeting" do
    # Non authenticated user
    get meeting_path(@meeting)
    assert_redirected_to new_user_session_path

    sign_in @user
    params = {
      meeting: {
        title: 'new title',
        start_date: Time.zone.now - 2,
        end_date: Time.zone.now - 1
      }
    }

    # Another user's meeting
    get meeting_path(@meeting2)
    assert_response :not_found

    patch meeting_path(@meeting2), params: params
    assert_response :not_found

    # Current user's meeting
    get meeting_path(@meeting)
    assert_response :success

    patch meeting_path(@meeting), params: params
    assert_response :success
    updated_meeting = JSON.parse(response.body)

    assert_not_equal updated_meeting['title'], @meeting.title
    assert_not_equal updated_meeting['start_date'], @meeting.start_date
    assert_not_equal updated_meeting['end_date'], @meeting.end_date
  end

  # Email attendees test
  test "unauthorized users can't send emails" do
    assert_no_enqueued_jobs do
      post meeting_email_attendees_url(@meeting)
      assert_redirected_to new_user_session_path
    end
  end

  test "users can't send emails from other users' meetings" do
    sign_in users(:two)

    assert_no_enqueued_jobs do
      post meeting_email_attendees_url(@meeting)
      assert_response :not_found
    end
  end

  test "users can send emails to attendees" do
    sign_in @user

    assert_enqueued_with(job: ActionMailer::DeliveryJob) do
      post meeting_email_attendees_url(@meeting)
      assert_response :success
    end

    json_response = JSON.parse(response.body)['message']
    assert_equal "Email successfully sent.", json_response
  end

end
