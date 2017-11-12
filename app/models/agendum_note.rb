#
# A single note taken on an agendum.
#
# Attributes:
#   - content:string
#
# Associations:
#   - agendum: The agendum this note was taken on.
#
class AgendumNote < ApplicationRecord
  include PgSearch

  multisearchable against: %i(content),
    additional_attributes: ->(note) {
      { user_id: note.meeting.user_id }
    }

  # Relationships
  belongs_to :agendum
  belongs_to :meeting

  # Validations
  validates :content, presence: true

  # The SQL to execute when rebuilding the search
  # document. This is needed to add the user's ID
  # https://github.com/Casecommons/pg_search/wiki/
  def self.rebuild_pg_search_documents
    connection.execute %q{
      INSERT INTO "pg_search_documents" (
        user_id,
        searchable_type,
        searchable_id,
        content,
        created_at,
        updated_at
      )
      SELECT
        "meetings".user_id AS user_id,
        'AgendumNote' AS searchable_type,
        "agendum_notes".id AS searchable_id,
        (
          coalesce("agendum_notes".content::text, '')
        ) AS content,
        now() AS created_at,
        now() AS updated_at
      FROM "agendum_notes"
      INNER JOIN "agendums" ON "agendum_notes".agendum_id = "agendums".id
      INNER JOIN "meetings" ON "agendums".meeting_id = "meetings".id
    }
  end
end
