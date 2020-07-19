class RenameAttendeesMeetingsToMeetingAttendees < ActiveRecord::Migration[6.0]
  def change
    rename_table :attendees_meetings, :meeting_attendees
  end
end
