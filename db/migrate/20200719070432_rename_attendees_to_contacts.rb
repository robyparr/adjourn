class RenameAttendeesToContacts < ActiveRecord::Migration[6.0]
  def change
    rename_table :attendees, :contacts
    rename_column :attendees_meetings, :attendee_id, :contact_id
    rename_column :action_items_attendees, :attendee_id, :contact_id

    rename_table :action_items_attendees, :action_items_contacts
  end
end
