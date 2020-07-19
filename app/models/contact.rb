class Contact < ApplicationRecord
  belongs_to :user
  has_many :attendees_meetings

  validates :email,
    presence: true,
    length: { minimum: 6, maximum: 254 },
    uniqueness: { scope: :user_id }
end
