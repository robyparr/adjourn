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

  test "Unauthenticated users are redirected to login page" do
    requests = [
      { method: :delete, url: meeting_url(@meeting) },
      { method: :get, url: meetings_url },
      { method: :get, url: meeting_path(@meeting) }
    ]

    requests.each do |request|
      self.send(request[:method], request[:url])
      assert_redirected_to new_user_session_path
    end
  end

  test "can list all a user's meetings" do
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

  test "can update an existing meeting" do
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
      post email_attendees_meeting_url(@meeting)
      assert_redirected_to new_user_session_path
    end
  end

  test "users can't send emails from other users' meetings" do
    sign_in users(:two)

    assert_no_enqueued_jobs do
      post email_attendees_meeting_url(@meeting)
      assert_response :not_found
    end
  end

  test "users can send emails to attendees" do
    sign_in @user

    @meeting.attendees << attendees(:one)
    assert_enqueued_with(job: ActionMailer::MailDeliveryJob) do
      post email_attendees_meeting_url(@meeting)
      assert_response :success
    end

    json_response = JSON.parse(response.body)['message']
    assert_equal "Email successfully sent.", json_response
  end

  test "Unauthorized users can't search" do
    rebuild_search_cache

    get search_url(q: 'first')
    assert_redirected_to new_user_session_path
  end

  test "users can search for meetings by the agenda" do
    rebuild_search_cache
    sign_in @user

    # Search by agenda
    get search_url(q: 'first')
    json_response = JSON.parse(response.body)
    assert_equal 1, json_response.size
    assert_equal @meeting.title, json_response.first['meeting']['title']

    # Search by agenda, partial word (full word is 'first')
    get search_url(q: 'st')
    json_response = JSON.parse(response.body)
    assert_equal 1, json_response.size
    assert_equal @meeting.title, json_response.first['meeting']['title']
  end

  test "users can search for meetings by the agenda notes" do
    rebuild_search_cache
    sign_in @user

    # Search by agenda notes
    get search_url(q: 'example')
    json_response = JSON.parse(response.body)
    assert_equal 1, json_response.size
    assert_equal @meeting.title, json_response.first['meeting']['title']

    # Search by agenda notes, partial word (full word is 'example')
    get search_url(q: 'exam')
    json_response = JSON.parse(response.body)
    assert_equal 1, json_response.size
    assert_equal @meeting.title, json_response.first['meeting']['title']
  end

  test "can't delete another users meetings" do
    sign_in users(:two)

    assert_no_difference 'Meeting.count' do
      delete meeting_path(@meeting)
    end
    assert_response :not_found
  end

  test 'can delete meetings' do
    sign_in @user
    assert_difference 'Meeting.count', -1 do
      assert_difference 'Agendum.count', -2 do
        delete meeting_path(@meeting)
      end
    end
    assert_redirected_to meetings_path
  end

  private

  def rebuild_search_cache
    PgSearch::Multisearch.rebuild(Agendum)
    PgSearch::Multisearch.rebuild(AgendumNote)
  end
end
