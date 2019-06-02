require "application_system_test_case"

module Meetings
  module Show
    class AgendaTest < ApplicationSystemTestCase
      setup do
        @user = users(:one)
        @meeting = @user.meetings.first
      end

      test 'adding an agendum' do
        sign_in @user
  
        visit meeting_url @meeting
        assert_equal 2, all('.agenda .agendum').count
  
        fill_in 'New Agendum', with: 'test'
        find('#new_title input').send_keys :enter
  
        sleep 0.1
        assert_equal 3, all('.agendum').count
        assert_equal 'test', all('.agendum .card-title p').last.text
      end

      test "Editing an agendum's title" do
        sign_in @user
        visit meeting_url @meeting
        assert @meeting.agenda.any?

        title_display_el = find('.agendum .card-head .card-title .inline-edit')
        title_display_el.double_click

        updated_title = "#{@meeting.agenda.first.title} (updated)"
        title_input = find('.agendum .card-head .card-title input')
        title_input.send_keys(updated_title).send_keys :enter

        assert_equal updated_title, title_display_el.text
      end
    end
  end
end
