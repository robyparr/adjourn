class AttendeesMeeting < ApplicationRecord
  belongs_to :attendee
  belongs_to :meeting
end
