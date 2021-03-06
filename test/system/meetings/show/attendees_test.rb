# typed: false
require "application_system_test_case"

module Meetings
  module Show
    class AttendeesTest < ApplicationSystemTestCase
      setup do
        @user = create :user
        @meeting = create :meeting, user: @user
      end

      test 'Adding previously non-existant contacts' do
        contact_email = 'non_existant_attendee@example.com'
        sign_in @user
        visit meeting_url @meeting

        assert @meeting.attendees.empty?

        fill_in 'Add Attendee', with: contact_email
        no_contacts_found_el = find('.autocomplete ul li')
        assert_match 'No attendees found.', no_contacts_found_el.text

        no_contacts_found_el.click
        assert_equal "#{contact_email[0..24]}...", find('.attendees-list .media-text').text
        assert_equal 1, @meeting.reload.attendees.count
      end

      test 'Adding previously existant contact' do
        contact_email = create(:contact).email

        sign_in @user
        visit meeting_url @meeting

        fill_in 'Add Attendee', with: contact_email
        contacts_found_el = find('.autocomplete ul li')
        assert_match contact_email, contacts_found_el.text

        contacts_found_el.click
        assert_equal contact_email, find('.attendees-list .media-text').text
        assert_equal 1, @meeting.reload.attendees.count
      end

      test 'emailing attendees' do
        sign_in @user
        visit meeting_url @meeting

        @meeting.add_attendee create(:contact).email

        find_by_testid('email-attendees-button').click
        assert find('.toast.info').present?
      end

      test 'emailing attendees fails when there are no attendees' do
        sign_in @user
        visit meeting_url @meeting

        assert @meeting.attendees.empty?

        find_by_testid('email-attendees-button').click
        assert find('.toast.error').present?
      end

      test 'mark attendees as attended/not attended' do
        attendee = create(:attendee, user: @user, meeting: @meeting)
        assert attendee.attended?

        sign_in @user
        visit meeting_url @meeting

        attendee_menu = find_by_testid("attendee-#{attendee.id}-menu")
        attendee_menu.click
        attend_button = find_by_testid('attendee-attend-button')

        assert attend_button.find('i')[:class].include?('fa-user-minus')
        attend_button.click
        wait_for_ajax
        assert_not attendee.reload.attended?

        attendee_menu.click
        assert attend_button.find('i')[:class].include?('fa-user-plus')
        attend_button.click
        wait_for_ajax
        assert attendee.reload.attended?
      end
    end
  end
end
