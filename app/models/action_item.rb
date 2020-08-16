class ActionItem < ApplicationRecord
  include JsonExportable

  belongs_to :meeting
  has_and_belongs_to_many :contacts, dependent: :destroy

  validates :title, presence: true
end
