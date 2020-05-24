require "application_system_test_case"

module Meetings
  module Show
    class AttendeesTest < ApplicationSystemTestCase
      setup do
        @user = create :user
        @meeting = create :meeting, user: @user
      end

      test 'Adding previously non-existant attendees' do
        attendee_email = 'non_existant_attendee@example.com'
        sign_in @user
        visit meeting_url @meeting

        assert @meeting.attendees.empty?

        fill_in 'Add Attendee', with: attendee_email
        no_attendees_found_el = find('.autocomplete ul li')
        assert_match 'No attendees found.', no_attendees_found_el.text

        no_attendees_found_el.click
        assert_equal "#{attendee_email[0..24]}...", find('.attendees-list .media-text').text
        assert_equal 1, @meeting.reload.attendees.count
      end

      test 'Adding previously existant attendees' do
        attendee_email = attendees(:one).email

        sign_in @user
        visit meeting_url @meeting

        fill_in 'Add Attendee', with: attendee_email
        attendees_found_el = find('.autocomplete ul li')
        assert_match attendee_email, attendees_found_el.text

        attendees_found_el.click
        assert_equal attendee_email, find('.attendees-list .media-text').text
        assert_equal 1, @meeting.reload.attendees.count
      end

      test 'emailing attendees' do
        sign_in @user
        visit meeting_url @meeting

        @meeting.attendees << attendees(:one)

        find('.button.primary').click
        assert find('.toast.info').present?
      end

      test 'emailing attendees fails when there are no attendees' do
        sign_in @user
        visit meeting_url @meeting

        assert @meeting.attendees.empty?

        find('.button.primary').click
        assert find('.toast.error').present?
      end
    end
  end
end
