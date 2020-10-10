# typed: true
class AddAttendedToMeetingAttendees < ActiveRecord::Migration[6.0]
  def change
    add_column :meeting_attendees, :attended, :boolean, default: true
  end
end
