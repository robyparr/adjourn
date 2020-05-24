require 'application_system_test_case'

module Meetings
  class ShowTest < ApplicationSystemTestCase
    setup do
      @user = create :user
      @meeting = create :meeting, user: @user
    end

    test 'visiting the meeting' do
      sign_in @user

      visit meeting_url @meeting
      assert_selector "h3", text: @meeting.title
    end

    test 'editing the title' do
      sign_in @user
      visit meeting_url @meeting

      assert_selector 'h3', text: @meeting.title
      find('h3').click

      updated_title = "#{@meeting.title} (updated)"
      title_input = find('.meeting-title input')
      title_input.send_keys(' (updated)').send_keys :enter

      assert_selector 'h3', text: updated_title
      assert_equal updated_title, @meeting.reload.title
    end
  end
end
