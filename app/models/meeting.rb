class Meeting < ApplicationRecord
  # Relationships
  belongs_to :user

  has_many :agenda,
    foreign_key: 'meeting_id',
    class_name: 'Agendum',
    dependent: :destroy

  has_many :action_items, dependent: :destroy
  has_and_belongs_to_many :attendees, dependent: :destroy
  has_many :notes, class_name: 'AgendumNote'

  # Validations
  validates :title,           presence: true
  validates :start_date,      presence: true
  validates :end_date,        presence: true
  validate  :end_date_after_start_date

  def self.to_html(meeting)
    view_variables = { meeting: meeting }

    controller = ExportController.new
    controller.render_to_string "meetings/export", locals: view_variables
  end

  # A meeting is recent if it ended less than a week ago
  # but after the current time.
  def recent?
    self.end_date >= Time.zone.now - 1.week && self.end_date < Time.zone.now
  end

  # A meeting is upcoming if it starts within a week
  # and hasn't finished yet. In progress meetings
  # will also be "upcoming."
  def upcoming?
    self.end_date <= Time.zone.now + 1.week && self.end_date >= Time.zone.now
  end

  # A meeting is in progress if it has started
  # and hasn't finished yet.
  def in_progress?
    self.start_date <= Time.now && self.end_date >= Time.now
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
