class GoogleCalendar < ApplicationRecord
  include JsonExportable

  belongs_to :google_account

  scope :by_account, ->(account) { where(google_account: account) }
end
