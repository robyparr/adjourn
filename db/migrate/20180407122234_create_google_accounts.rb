# typed: true
class CreateGoogleAccounts < ActiveRecord::Migration[5.1]
  def change
    create_table :google_accounts do |t|
      t.references :user, foreign_key: true
      t.string :email, null: false
      t.string :avatar_url
      t.string :refresh_token, null: false

      t.timestamps
    end

    add_index :google_accounts, :email, unique: true
  end
end
