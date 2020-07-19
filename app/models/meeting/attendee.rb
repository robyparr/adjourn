class Meeting::Attendee < ApplicationRecord
  belongs_to :contact
  belongs_to :meeting

  validates :contact, uniqueness: { scope: :meeting }

  delegate :email, to: :contact
end
