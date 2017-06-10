require 'test_helper'

class MeetingsControllerTest < ActionDispatch::IntegrationTest
  
  test "can list all meetings" do
    get meetings_path
    assert_response :success

    meetings = assigns(:meetings)

    Meeting.all.each do |meeting|
      assert meetings.include? meeting
    end
  end
  
end
