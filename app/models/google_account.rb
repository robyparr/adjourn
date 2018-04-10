class GoogleAccount < ApplicationRecord
  belongs_to :user

  validates :email, presence: true, uniqueness: true
  validates :refresh_token, presence: true
end
