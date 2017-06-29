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

  # Relationships
  belongs_to :agendum

  # Validations
  validates :content, presence: true
end
