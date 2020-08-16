class CreateUserExports < ActiveRecord::Migration[6.0]
  def change
    create_table :user_exports do |t|
      t.references :user, foreign_key: true
      t.string :status, null: false
      t.string :storage_key, null: true

      t.timestamps
    end
  end
end
