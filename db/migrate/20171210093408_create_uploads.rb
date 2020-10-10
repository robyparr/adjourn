# typed: true
class CreateUploads < ActiveRecord::Migration[5.1]
  def change
    create_table :uploads do |t|
      t.references :agendum, foreign_key: true, index: true
      t.string :filename
      t.string :content_type
      t.string :file_size
      t.string :storage_key

      t.timestamps
    end
  end
end
