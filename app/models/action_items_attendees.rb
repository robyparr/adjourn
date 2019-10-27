class ActionItemsAttendees < ApplicationRecord
  belongs_to :attendee
  belongs_to :action_item
end
