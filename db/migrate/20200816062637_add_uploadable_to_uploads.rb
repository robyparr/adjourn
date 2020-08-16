class AddUploadableToUploads < ActiveRecord::Migration[6.0]
  def change
    add_column :uploads, :uploadable_id, :bigint
    add_column :uploads, :uploadable_type, :string

    add_index :uploads, [:uploadable_id, :uploadable_type]
  end
end
