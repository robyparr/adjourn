# typed: true
module MeetingsHelper

  def recent_meetings(meetings)
    meetings.select { |it| it.recent? }
  end

  def upcoming_meetings(meetings)
    meetings
      .select { |it| it.upcoming? }
      .sort_by { |it| it.start_date }
  end

  def display_recent_and_upcoming_meetings_section?(page)
    page.nil? || page.to_i == 1
  end

  def meetings_list(meetings, page)
    return meetings unless display_recent_and_upcoming_meetings_section?(page)
    neither_upcoming_nor_recent_meetings(meetings)
  end

  def neither_upcoming_nor_recent_meetings(meetings)
    meetings.select { |it| !it.upcoming? && !it.recent? }
  end

  def upcoming_meeting_item_classes(meeting)
    html_class = "collection-item"
    html_class += " green lighten-4" if meeting.in_progress?
    html_class
  end

  def when_in_words(meeting)
    return "Now" if meeting.in_progress?

    if meeting.upcoming?
      "in #{time_ago_in_words(meeting.start_date)}"
    else
      "#{time_ago_in_words(meeting.end_date)} ago"
    end
  end
end
