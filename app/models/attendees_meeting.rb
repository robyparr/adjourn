class AttendeesMeeting < ApplicationRecord
  belongs_to :attendee
  belongs_to :meeting

  validates :attendee, uniqueness: { scope: :meeting }
end
