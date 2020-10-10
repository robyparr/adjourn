# typed: true
class AddMeetingToAgendumNote < ActiveRecord::Migration[5.1]
  def change
    add_reference :agendum_notes, :meeting, foreign_key: true

    AgendumNote.all.includes(:agendum).each do |note|
      note.update(meeting_id: note.agendum.meeting_id)
    end
  end
end
