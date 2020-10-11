class CreateMeetingLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :meeting_links do |t|
      t.references :from_meeting, null: false, foreign_key: { to_table: :meetings }
      t.references :to_meeting, null: false, foreign_key: { to_table: :meetings }
      t.references :user, null: false, foreign_key: true
      t.string :link_type, null: false

      t.timestamps
    end

    add_index :meeting_links, [:from_meeting_id, :to_meeting_id, :link_type], unique: true, name: :index_link_uniqueness
  end
end
