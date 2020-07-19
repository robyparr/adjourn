class ActionItemsAttendees < ApplicationRecord
  belongs_to :contact
  belongs_to :action_item
end
