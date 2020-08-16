class UserExporter
  def initialize(export)
    @export = export
  end

  def to_json
    view_renderer.render_to_string('exports/_export', locals: { user: user })
  end

  private

  attr_reader :export

  def view_renderer
    ExportController.new
  end

  def user
    @user ||= User.includes(user_includes).find(export.user_id)
  end

  def user_includes
    [
      { meetings: [{ agenda: %i[notes uploads] }, :attendees, :action_items] },
      :contacts,
      { google_accounts: %i[google_calendars] },
    ]
  end
end
