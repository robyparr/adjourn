class GoogleAccount < ApplicationRecord
  belongs_to :user
  has_many :google_calendars

  validates :email, presence: true, uniqueness: true
  validates :refresh_token, presence: true
end
