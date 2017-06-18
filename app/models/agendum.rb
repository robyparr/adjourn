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

  #
  # Validations
  #
  validates :title, presence: true
  validates :meeting, presence: true
end
