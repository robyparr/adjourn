class CreateActionItems < ActiveRecord::Migration[5.1]
  def change
    create_table :action_items do |t|
      t.string :title
      t.references :meeting, foreign_key: true

      t.timestamps
    end
  end
end
