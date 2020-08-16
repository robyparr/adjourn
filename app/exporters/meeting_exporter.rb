class MeetingExporter < BaseExporter
  include ApplicationHelper

  def initialize(meeting_id)
    @meeting_id = meeting_id
  end

  def meeting
    includes_params = [{ agenda: [:notes, :uploads] }, { action_items: :contacts }, :attendees]
    @meeting ||= Meeting.includes(*includes_params).find(meeting_id)
  end

  def to_html
    view_variables = {
      meeting: meeting,
      inline_images: inline_images,
      base_formatting: false,
    }

    render_view_to_string 'meetings/export', view_variables
  end

  def to_pdf
    inline_images = {}
    meeting.uploads.each do |upload|
      next unless meeting.inline_image_upload?(upload)

      file = URI.open(upload.url).read
      inline_images[upload.id] = { url: "data:#{upload.content_type};base64, #{Base64.encode64(file)}" }
    end
    add_adjourn_logo_to_inline_images! inline_images

    view_variables = {
      meeting: meeting,
      inline_images: inline_images,
      base_formatting: true
    }
    render_view_to_pdf 'meetings/export', view_variables
  end

  def inline_images=(inline_images)
    @inline_images = inline_images
  end

  private

  attr_reader :meeting_id,
              :inline_images

  def add_adjourn_logo_to_inline_images!(inline_images)
    adjourn_logo  = File.read(Rails.root.join('app/assets/images/icon-blue.png'))
    logo_filename = 'adjourn-logo'

    inline_images[logo_filename] = "data:image/png;base64, #{Base64.encode64(adjourn_logo)}"
  end
end
