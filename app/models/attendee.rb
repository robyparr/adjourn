class Attendee < ApplicationRecord
  belongs_to :user

  validates :email, 
    presence: true, 
    length: { minimum: 6, maximum: 254 },
    uniqueness: { scope: :user_id }
end
