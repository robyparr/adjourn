# typed: false
class CreatePgSearchDocuments < ActiveRecord::Migration[5.1]
  def self.up
    say_with_time("Creating table for pg_search multisearch") do
      create_table :pg_search_documents do |t|
        t.text :content
        t.belongs_to :searchable, :polymorphic => true, :index => true
        t.integer :user_id, index: true
        t.timestamps null: false
      end
    end

    PgSearch::Multisearch.rebuild(Agendum)
    PgSearch::Multisearch.rebuild(AgendumNote)
  end

  def self.down
    say_with_time("Dropping table for pg_search multisearch") do
      drop_table :pg_search_documents
    end
  end
end
