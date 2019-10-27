class ActionItem < ApplicationRecord
  belongs_to :meeting
  has_and_belongs_to_many :attendees, dependent: :destroy

  validates :title, presence: true
end
