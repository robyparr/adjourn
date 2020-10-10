# typed: true
class ChangeUploadsFileSizeToInteger < ActiveRecord::Migration[5.1]
  def change
    change_column :uploads, :file_size, :integer, using: 'file_size::integer'
  end
end
