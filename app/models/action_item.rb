#
# Represents a single Action Item to be taken after a meeting.
#
# Attributes:
#   - title:string
#
# Relationships
#   - Meeting:    The meeting this action item belongs to.
#
class ActionItem < ApplicationRecord
  belongs_to :meeting

  validates :title, presence: true
end
