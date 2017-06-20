require 'test_helper'

class MeetingsControllerTest < ActionDispatch::IntegrationTest
  
  def setup
    @meeting = meetings(:one)
  end
  
  test "can list all meetings" do
    get meetings_path
    assert_response :success

    meetings = assigns(:meetings)

    Meeting.all.each do |meeting|
      assert meetings.include? meeting
    end
  end

  test "can create a new meeting" do
    get new_meeting_path
    assert_response :success

    assert_difference 'Meeting.count', 1 do
      post meetings_path, params: {
        meeting: {
          title: 'the title',
          start_date: Time.zone.now,
          end_date: Time.zone.now + 1
        }
      }
    end
    assert_response :created
  end

  test "can update an existing meeting" do
    get meeting_path(@meeting)
    patch meeting_path(@meeting), params: {
      meeting: {
        title: 'new title',
        start_date: Time.zone.now - 2,
        end_date: Time.zone.now - 1
      }
    }
    assert_response :success
    updated_meeting = JSON.parse(response.body)

    assert_not_equal updated_meeting['title'], @meeting.title
    assert_not_equal updated_meeting['start_date'], @meeting.start_date
    assert_not_equal updated_meeting['end_date'], @meeting.end_date
  end

end
