class RemoveAgendumIdFromUploads < ActiveRecord::Migration[6.0]
  def change
    remove_column :uploads, :agendum_id
  end
end
