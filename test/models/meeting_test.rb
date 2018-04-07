require 'test_helper'

class MeetingTest < ActiveSupport::TestCase
  def setup
    @meeting = meetings(:one)
    @meeting.user = users(:one)
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
end
