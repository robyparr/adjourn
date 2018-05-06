if Rails.env.development?
  require_dependency 'google_service'
  require_dependency 'google_service/calendar_event'
end

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :confirmable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Relationships
  has_many :meetings, dependent: :destroy
  has_many :agenda, through: :meetings, dependent: :destroy
  has_many :attendees, dependent: :destroy
  has_many :uploads, through: :agenda
  has_many :notes, class_name: 'AgendumNote', through: :meetings
  has_many :google_accounts, dependent: :destroy


  def load_calendar_events
    accounts = google_accounts.includes(:google_calendars)
    calendars = accounts.map(&:google_calendars).flatten

    events = fetch_google_calendar_events(calendars)
      .yield_self { |events| filter_out_added_calendar_events(events) }
      .yield_self { |events| events.sort_by { |it| it[:start] } }

    { has_google_accounts: accounts.present?,
      has_synced_calendars: calendars.present?,
      events: events }
  end

  private

  def fetch_google_calendar_events(calendars)
    event_threads = calendars.map do |calendar|
      Thread.new do
        GoogleService::CalendarEvent.new(
          calendar.google_account, calendar.google_id).all
      end
    end
    event_threads.map(&:value).flatten
  end

  def filter_out_added_calendar_events(events)
    return events unless events.present?
    added_event_ids = meetings.where('google_event_id IS NOT NULL')
      .pluck :google_event_id
    events.reject { |it| added_event_ids.include? it[:id] }
  end
end
