# typed: strict
class GoogleAccount < ApplicationRecord
  include JsonExportable

  belongs_to :user
  has_many :google_calendars, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :refresh_token, presence: true
end
