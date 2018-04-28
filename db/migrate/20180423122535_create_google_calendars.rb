class CreateGoogleCalendars < ActiveRecord::Migration[5.1]
  def change
    create_table :google_calendars do |t|
      t.string :google_id, index: true
      t.references :google_account, foreign_key: true

      t.timestamps
    end
    add_index :google_calendars, [:google_id, :google_account_id], unique: true
  end
end
