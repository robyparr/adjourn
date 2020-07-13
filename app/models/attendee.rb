class Attendee < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :meetings

  validates :email,
    presence: true,
    length: { minimum: 6, maximum: 254 },
    uniqueness: { scope: :user_id }
end
