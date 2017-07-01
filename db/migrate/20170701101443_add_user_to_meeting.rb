class AddUserToMeeting < ActiveRecord::Migration[5.1]
  def change
    add_reference :meetings, :user, foreign_key: true
  end
end
