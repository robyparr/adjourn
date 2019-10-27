class CreateActionItemsAttendees < ActiveRecord::Migration[5.2]
  def change
    create_table :action_items_attendees do |t|
      t.references :action_item, foreign_key: true
      t.references :attendee, foreign_key: true

      t.timestamps
    end

    add_index :action_items_attendees, [:attendee_id, :action_item_id], unique: true
  end
end
