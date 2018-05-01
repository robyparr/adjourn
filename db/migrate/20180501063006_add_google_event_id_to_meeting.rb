class AddGoogleEventIdToMeeting < ActiveRecord::Migration[5.1]
  def change
    add_column :meetings, :google_event_id, :string, null: true, index: true
  end
end
