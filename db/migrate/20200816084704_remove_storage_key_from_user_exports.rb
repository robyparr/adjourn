class RemoveStorageKeyFromUserExports < ActiveRecord::Migration[6.0]
  def change
    remove_column :user_exports, :storage_key
  end
end
