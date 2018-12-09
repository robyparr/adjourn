class AddUserToUploads < ActiveRecord::Migration[5.2]
  def change
    add_reference :uploads, :user, foreign_key: true, null: true
  end
end
