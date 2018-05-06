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
    @has_google_accounts = false
    @has_synced_calendars = false

    events = fetch_google_calendar_events
      .yield_self { |events| filter_out_added_calendar_events(events) }
      .yield_self { |events| events.sort_by { |it| it[:start] } }

    { has_google_accounts: @has_google_accounts,
      has_synced_calendars: @has_synced_calendars,
      events: events }
  end

  private

  def fetch_google_calendar_events
    google_accounts.includes(:google_calendars).map do |account|
      @has_google_accounts = true
      account.google_calendars.map do |calendar|
        @has_synced_calendars = true
        GoogleService::CalendarEvent.new(account, calendar.google_id).all
      end
    end.flatten
  end

  def filter_out_added_calendar_events(events)
    return events unless events.present?
    added_event_ids = meetings.where('google_event_id IS NOT NULL')
      .pluck :google_event_id
    events.reject { |it| added_event_ids.include? it[:id] }
  end
end
