class AddPositionToAgenda < ActiveRecord::Migration[5.2]
  def change
    add_column :agendums, :position, :integer, null: true
  end
end
