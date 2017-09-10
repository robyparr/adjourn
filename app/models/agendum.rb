#
# A single item on a meeting's agenda.
#
# Attributes:
#   - title:string
#   - description:string
#
# Associations
#   - meeting: The meeting this agendum belongs to.
#
class Agendum < ApplicationRecord
  #
  # Relationships
  #
  belongs_to :meeting
  has_many :notes, class_name: 'AgendumNote', dependent: :destroy

  #
  # Validations
  #
  validates :title, presence: true
  validates :meeting, presence: true

  def markdown_description
    if description
      MarkdownRenderer.render(description)
    else
      ""
    end
  end
end
