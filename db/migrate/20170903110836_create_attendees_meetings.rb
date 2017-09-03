class CreateAttendeesMeetings < ActiveRecord::Migration[5.1]
  def change
    create_table :attendees_meetings do |t|
      t.references :attendee, foreign_key: true
      t.references :meeting, foreign_key: true

      t.timestamps
    end

    add_index :attendees_meetings, [:attendee_id, :meeting_id], unique: true
  end
end
