class CreateAgendums < ActiveRecord::Migration[5.1]
  def change
    create_table :agendums do |t|
      t.string :title
      t.string :description
      t.references :meeting, foreign_key: true

      t.timestamps
    end
  end
end
