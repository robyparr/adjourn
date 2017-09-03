class CreateAttendees < ActiveRecord::Migration[5.1]
  def change
    create_table :attendees do |t|
      t.string :email
      t.references :user, foreign_key: true

      t.timestamps
    end

    add_index :attendees, [:email, :user_id], unique: true
  end
end
