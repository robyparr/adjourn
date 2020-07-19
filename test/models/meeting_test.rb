require 'test_helper'

class MeetingTest < ActiveSupport::TestCase
  def setup
    @user = create :user
    @meeting = create :meeting, user: @user
    create_list :agendum, 2, meeting: @meeting
  end

  test 'meeting is valid' do
    assert @meeting.valid?
  end

  test 'meeting must have a title' do
    @meeting.title = ' '
    assert_not @meeting.valid?
  end

  test 'meeting must have a start_date' do
    @meeting.start_date = nil
    assert_not @meeting.valid?
  end

  test 'meeting must have an end_date after the start_date' do
    @meeting.start_date = DateTime.now
    @meeting.end_date = @meeting.start_date + 1

    # end_date is present
    assert @meeting.valid?

    # end_date is the same as start_date
    @meeting.end_date = @meeting.start_date
    assert_not @meeting.valid?

    # end_date is after start_date
    @meeting.end_date -= 1
    assert_not @meeting.valid?
  end

  test 'meeting may have an agenda' do
    assert @meeting.agenda.count > 0
  end

  test "recent? returns true if the meeting ended within a week ago" do
    @meeting.end_date = 5.days.ago
    assert @meeting.recent?
  end

  test "recent? returns false if the meeting is in progress" do
    @meeting.start_date = Time.zone.now - 1.minute
    @meeting.end_date = Time.zone.now + 10.minutes
    assert_not @meeting.recent?
  end

  test "recent? returns false if the meeting hasn't started yet" do
    @meeting.start_date = Time.zone.now + 10.minutes
    @meeting.end_date = @meeting.start_date + 10.minutes
    assert_not @meeting.recent?
  end

  test "in_progress? returns true if the meeting is in progress" do
    @meeting.start_date = Time.zone.now - 1.minute
    @meeting.end_date = @meeting.start_date + 10.minutes
    assert @meeting.in_progress?
  end

  test "in_progress? returns false if the meeting hasn't started yet" do
    @meeting.start_date = Time.zone.now + 1.minute
    @meeting.end_date = @meeting.start_date + 10.minutes
    assert_not @meeting.in_progress?
  end

  test "in_progress? returns false if the meeting has already finished" do
    @meeting.start_date = Time.zone.now - 10.minutes
    @meeting.end_date = @meeting.start_date + 5.minutes
    assert_not @meeting.in_progress?
  end

  test "upcoming? returns true if the meeting is in progress" do
    @meeting.start_date = Time.zone.now - 1.minute
    @meeting.end_date = @meeting.start_date + 10.minutes
    assert @meeting.upcoming?
  end

  test "upcoming? returns true if the meeting starts within a week" do
    @meeting.start_date = Time.zone.now + 1.day
    @meeting.end_date = @meeting.start_date + 10.minutes
    assert @meeting.upcoming?
  end

  test "upcoming? returns false if the meeting has already finished" do
    @meeting.start_date = Time.zone.now - 10.minutes
    @meeting.end_date = @meeting.start_date + 5.minutes
    assert_not @meeting.upcoming?
  end

  test "add_attendee adds an existing contact to the meeting" do
    contact = create(:contact, user: @user)
    @meeting.attendees.delete_all
    assert_difference '@meeting.attendees.count', 1 do
      result = @meeting.add_attendee(contact.email)
      assert_kind_of Meeting::Attendee, result
      assert_equal @meeting.id, result.meeting_id
    end

    assert @meeting.attendees.where(contact: contact).any?
  end

  test "add_attendee creates and adds a new contact for unknown emails" do
    contact_email = 'brand_new_email@example.com'
    @meeting.attendees.delete_all

    assert_difference ['@meeting.attendees.count', 'Contact.count'], 1 do
      result = @meeting.add_attendee(contact_email)
      assert_kind_of(Meeting::Attendee, result)
      assert_equal @meeting.id, result.meeting_id
    end
    contact = Contact.find_by(email: contact_email)
    assert @meeting.attendees.where(contact: contact).any?
  end

  test "add_attendee returns an error when adding the same email twice" do
    meeting = create(:meeting, user: @user)
    contact = create(:contact)
    meeting.add_attendee(contact.email)

    assert_no_difference 'meeting.attendees.count' do
      result = meeting.add_attendee(contact.email)
      assert_kind_of Meeting::Attendee, result
      assert_equal meeting.id, result.meeting_id
      assert_equal false, result.persisted?
      assert_equal({ contact: ['is already attending this meeting'] }, result.errors.messages)
    end
  end
end
