require "application_system_test_case"

module Meetings
  class ShowTest < ApplicationSystemTestCase
    setup do
      @user = users(:one)
      @meeting = @user.meetings.first
    end

    test "visiting the meeting" do
      sign_in @user

      visit meeting_url @meeting
      assert_selector "h3", text: @meeting.title
    end

    test 'editing the title' do
      sign_in @user
      visit meeting_url @meeting

      assert_selector 'h3', text: @meeting.title
      find('h3').double_click

      updated_title = "#{@meeting.title} (updated)"
      title_input = find('.meeting-title')
      title_input.send_keys(updated_title).send_keys :enter

      assert_selector 'h3', text: "#{@meeting.title} (updated)"
      assert_equal updated_title, @meeting.reload.title
    end
  end
end
