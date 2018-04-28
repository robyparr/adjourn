class GoogleCalendar < ApplicationRecord
  belongs_to :google_account

  scope :by_account, ->(account) { where(google_account: account) }
end
