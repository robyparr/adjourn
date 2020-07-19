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
        assert_match 'No contacts found.', no_contacts_found_el.text

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
