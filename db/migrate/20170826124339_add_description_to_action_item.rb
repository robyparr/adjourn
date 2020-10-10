# typed: true
class AddDescriptionToActionItem < ActiveRecord::Migration[5.1]
  def change
    add_column :action_items, :description, :text
  end
end
