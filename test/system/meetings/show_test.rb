require "application_system_test_case"

module Meetings
  class ShowTest < ApplicationSystemTestCase
    setup do
      @user = users(:one)
      @meeting = @user.meetings.first
      ActionController::Base.allow_forgery_protection = true
    end

    test "visiting the meeting" do
      sign_in @user

      visit meeting_url @meeting
      assert_selector "h3", text: @meeting.title
    end

    test "adding an agendum" do
      sign_in @user

      visit meeting_url @meeting
      assert_equal 2, all('.agenda .agendum').count

      fill_in 'New Agendum', with: 'test'
      find('#new_title input').send_keys :enter

      sleep 0.1
      assert_equal 3, all('.agendum').count
      assert_equal 'test', all('.agendum .card-title p').last.text
    end
  end
end