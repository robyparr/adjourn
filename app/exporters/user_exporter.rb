class UserExporter < BaseExporter
  def initialize(user_id)
    @user_id = user_id
  end

  def to_json
    render_view_to_string 'exports/_export.json', user: user
  end

  def user
    @user ||= User.includes(user_includes).find(user_id)
  end

  private

  attr_reader :user_id

  def user_includes
    [
      { meetings: [{ agenda: %i[notes uploads] }, :attendees, :action_items] },
      :contacts,
      { google_accounts: %i[google_calendars] },
    ]
  end
end
