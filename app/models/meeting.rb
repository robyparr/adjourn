class Meeting < ApplicationRecord
  include JsonExportable
  include Rails.application.routes.url_helpers

  # Relationships
  belongs_to :user

  has_many :agenda,
    -> { order('position asc') },
    foreign_key: 'meeting_id',
    class_name: 'Agendum',
    dependent: :destroy

  has_many :action_items, dependent: :destroy
  has_many :attendees, class_name: 'Meeting::Attendee', dependent: :destroy
  has_many :notes, class_name: 'AgendumNote'
  has_many :uploads, through: :agenda

  # Validations
  validates :title,           presence: true
  validates :start_date,      presence: true
  validates :end_date,        presence: true
  validate  :end_date_after_start_date

  def full_agenda
    @full_agenda ||= agenda.map(&:description).join(' ')
  end

  def inline_image_upload?(upload)
    return unless upload.content_type.starts_with?('image/')

    full_agenda.include?(download_upload_path(upload))
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

  def add_attendee(email)
    contact = user.contacts.find_or_create_by email: email
    attendees.create contact_id: contact.id
  end

  def remove_attendee(email)
    contact  = user.contacts.find_by(email: email)
    attendee = attendees.find_by(contact_id: contact.id)
    attendee.destroy
  end

  private

  # Add an error to the model unless :end_date is after :start_date
  def end_date_after_start_date
    is_valid = self.end_date && self.start_date &&
      self.end_date > self.start_date

    errors.add(:end_date, "must be after #{start_date}") unless is_valid
  end
end
