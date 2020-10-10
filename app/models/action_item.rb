# typed: true
class ActionItem < ApplicationRecord
  include JsonExportable

  belongs_to :meeting
  has_and_belongs_to_many :contacts

  validates :title, presence: true
end
