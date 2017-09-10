#
# Represents a single Action Item to be taken after a meeting.
#
# Attributes:
#   - title:string
#   - description:text
#
# Relationships
#   - Meeting:    The meeting this action item belongs to.
#
class ActionItem < ApplicationRecord
  belongs_to :meeting

  validates :title, presence: true

  def markdown_description
    if description
      MarkdownRenderer.render(description)
    else
      ""
    end
  end
end
