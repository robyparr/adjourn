# typed: ignore
class Agendum < ApplicationRecord
  include PgSearch::Model
  include JsonExportable

  multisearchable against: %i[title description],
    additional_attributes: ->(agendum) { { user_id: agendum.meeting.user_id } }

  # Relationships
  belongs_to :meeting
  has_one :user, through: :meeting
  has_many :notes, class_name: 'AgendumNote', dependent: :destroy
  has_many :uploads, as: :uploadable, dependent: :destroy

  # Validations
  validates :title, presence: true
  validates :meeting, presence: true

  # Hooks
  before_create :set_position

  def markdown_description
    if description
      MarkdownRenderer.render(description)
    else
      ''
    end
  end

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
        "meetings".user_id as user_id,
        'Agendum' AS searchable_type,
        "agendums".id AS searchable_id,
        (
          coalesce("agendums".title::text, '')
          || ' '
          || coalesce("agendums".description::text, '')
        ) AS content,
        now() AS created_at,
        now() AS updated_at
      FROM "agendums"
      INNER JOIN "meetings" on "agendums".meeting_id = "meetings".id
    }
  end

  private

  def next_position
    meeting.agenda.maximum(:position).to_i + 1
  end

  def set_position
    self.position = next_position
  end
end
