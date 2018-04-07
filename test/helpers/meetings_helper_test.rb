require 'test_helper'

class MeetingsHelperTest < ActionView::TestCase
  setup do
    @recent_meeting = meetings(:one).tap do |meeting|
      meeting.start_date = Time.zone.now - 2.days
      meeting.end_date = meeting.start_date + 1.hour
    end

    @upcoming_meeting = meetings(:two).tap do |meeting|
      meeting.start_date = Time.zone.now + 2.days
      meeting.end_date = meeting.start_date + 1.hour
    end
    @meetings = [@recent_meeting, @upcoming_meeting]
  end

  test "recent_meetings returns only recent meetings" do
    recent = recent_meetings(@meetings)
    assert_equal 1, recent.size
    assert_equal @recent_meeting.id, recent.first.id
  end

  test "upcoming_meetings returns only upcoming meetings" do
    upcoming = upcoming_meetings(@meetings)
    assert_equal 1, upcoming.size
    assert_equal @upcoming_meeting.id, upcoming.first.id
  end

  test "neither_upcoming_nor_recent_meetings returns all other meetings" do
    old_meeting = @upcoming_meeting.tap do |meeting|
      meeting.start_date = Time.zone.now - 1.year
      meeting.end_date = @upcoming_meeting.start_date + 1.hour
    end
    the_rest = neither_upcoming_nor_recent_meetings(@meetings)

    assert_equal 1, the_rest.size
    assert_equal old_meeting.id, the_rest.first.id
  end
end