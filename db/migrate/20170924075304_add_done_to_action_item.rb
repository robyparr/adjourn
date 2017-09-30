class AddDoneToActionItem < ActiveRecord::Migration[5.1]
  def change
    add_column :action_items, :done, :boolean, default: false
  end
end
