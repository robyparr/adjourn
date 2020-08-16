class Contact < ApplicationRecord
  include JsonExportable

  belongs_to :user
  has_many :meeting_attendees, class_name: 'Meeting::Attendee'

  validates :email,
    presence: true,
    length: { minimum: 6, maximum: 254 },
    uniqueness: { scope: :user_id }
end
