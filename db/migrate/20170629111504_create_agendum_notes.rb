# typed: true
class CreateAgendumNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :agendum_notes do |t|
      t.references :agendum, foreign_key: true
      t.string :content

      t.timestamps
    end
  end
end
