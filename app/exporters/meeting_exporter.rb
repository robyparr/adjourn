class MeetingExporter
  def initialize(meeting_id)
    @meeting_id = meeting_id
  end

  def meeting
    includes_params = [{ agenda: [:notes, :uploads] }, { action_items: :contacts }, :attendees]
    @meeting ||= Meeting.includes(*includes_params).find(meeting_id)
  end

  def to_html
    view_variables = { meeting: meeting, inline_images: inline_images }

    export_controller = ExportController.new
    export_controller.render_to_string 'meetings/export', locals: view_variables
  end

  def inline_images=(inline_images)
    @inline_images = inline_images
  end

  private

  attr_reader :meeting_id,
              :inline_images
end
