class MeetingMailer < ApplicationMailer
  attr_accessor :inline_images

  def attendees_email(meeting_id)
    meeting_exporter = MeetingExporter.new(meeting_id)
    meeting = meeting_exporter.meeting

    prepare_attachments meeting
    meeting_exporter.inline_images = inline_images
    meeting_html = meeting_exporter.to_html.html_safe

    email_options = {
      reply_to: meeting.user.email,
      cc:       meeting.attendees.map(&:email).uniq,
      subject:  "Meeting Notes: #{meeting.title}"
    }

    mail(email_options) do |format|
      format.html { render html: meeting_html }
    end
  end

  private

  def prepare_attachments(meeting)
    self.inline_images ||= {}

    meeting.uploads.each do |upload|
      file = URI.open(upload.url).read

      if meeting.inline_image_upload?(upload)
        attachments.inline[upload.filename] = file
        self.inline_images[upload.id] = { url: attachments[upload.filename].url }
      else
        attachments[upload.filename] = file
      end
    end

    add_adjourn_logo_to_attachments!
  end

  def add_adjourn_logo_to_attachments!
    adjourn_logo  = File.read(Rails.root.join('app/assets/images/icon-blue.png'))
    logo_filename = 'adjourn-logo'

    attachments.inline["#{logo_filename}.png"] = adjourn_logo
    self.inline_images[logo_filename] = attachments["#{logo_filename}.png"].url
  end
end
