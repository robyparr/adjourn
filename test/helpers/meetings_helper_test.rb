require 'test_helper'

class MeetingsHelperTest < ActionView::TestCase
  setup do
    @recent_meeting = create(:meeting).tap do |meeting|
      meeting.start_date = Time.zone.now - 2.days
      meeting.end_date = meeting.start_date + 1.hour
    end

    @upcoming_meeting = create(:meeting).tap do |meeting|
      meeting.start_date = Time.zone.now + 2.days
      meeting.end_date = meeting.start_date + 1.hour
    end
    @meetings = [@recent_meeting, @upcoming_meeting]
  end

  def make_meeting_old(meeting)
    meeting.tap do |old_meeting|
      old_meeting.start_date = Time.zone.now - 1.year
      old_meeting.end_date = meeting.start_date + 1.hour
    end
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

  test "display_recent_and_upcoming_meetings_section? is true without a page" do
    assert display_recent_and_upcoming_meetings_section?(nil)
  end

  test "display_recent_and_upcoming_meetings_section? is true when page is 1" do
    assert display_recent_and_upcoming_meetings_section?("1")
  end

  test "display_recent_and_upcoming_meetings_section? is false when page is >1" do
    assert_not display_recent_and_upcoming_meetings_section?("2")
  end

  test "meetings_list returns the full meeting list if display_recent_and_upcoming_meetings_section? is false" do
    page = "2"
    meetings = meetings_list(@meetings, page)

    assert_not display_recent_and_upcoming_meetings_section?(page)
    assert_equal @meetings.size, meetings.size
  end

  test "meetings_list returns neither_upcoming_nor_recent_meetings if display_recent_and_upcoming_meetings_section? is false" do
    page = "1"
    old_meeting = make_meeting_old(@upcoming_meeting)
    meetings = meetings_list(@meetings, page)

    assert display_recent_and_upcoming_meetings_section?(page)
    assert_equal 1, meetings.size
    assert_equal old_meeting.id, meetings.first.id
  end
end
