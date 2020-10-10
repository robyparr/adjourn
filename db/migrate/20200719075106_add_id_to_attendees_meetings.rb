# typed: true
class AddIdToAttendeesMeetings < ActiveRecord::Migration[6.0]
  def change
    add_column :attendees_meetings, :id, :primary_key
  end
end
