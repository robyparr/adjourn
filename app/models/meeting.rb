#
# Represents a single meeting.
#
# Attributes:
#   - title:string
#   - description:string
#   - start_date:datetime
#   - end_date:datetime
#
# Associations:
#   - Agenda:       A list of agendum (agenda items).
#   - User:         The user who created the meeting.
#   - ActionItems:  A list of action items for this meeting.
#   - Attendees:    A list of meeting attendees.
#
class Meeting < ApplicationRecord
  #
  # Relationships
  #
  has_many    :agenda, foreign_key: 'meeting_id', class_name: 'Agendum'
  has_many    :action_items
  belongs_to  :user
  has_and_belongs_to_many :attendees

  #
  # Validations
  #
  validates :title,           presence: true
  validates :start_date,      presence: true
  validates :end_date,        presence: true
  validate  :end_date_after_start_date

  def self.to_html(meeting)
    view_variables = { meeting: meeting }

    controller = ActionController::Base.new
    controller.render_to_string "meetings/export", locals: view_variables
  end

  private
    # Add an error to the model unless :end_date
    # is after :start_date
    def end_date_after_start_date
        is_valid = self.end_date && self.start_date && 
          self.end_date > self.start_date
      
        errors.add(:end_date, "must be after #{start_date}") unless is_valid
    end
end
