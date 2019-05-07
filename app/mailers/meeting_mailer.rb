class MeetingMailer < ApplicationMailer
  def attendees_email(meeting_id)
    meeting = Meeting
      .includes({ agenda: [:notes, :uploads] }, :action_items, :attendees)
      .find(meeting_id)

    email_options = {
      reply_to: meeting.user.email,
      cc:       meeting.attendees.map(&:email).uniq,
      subject:  "Meeting Notes: #{meeting.title}"
    }

    prepare_attachments meeting

    mail(email_options) do |format|
      format.html { render html: meeting.to_html.html_safe }
    end
  end

  private

  def prepare_attachments(meeting)
    meeting.uploads.each do |upload|
      next if meeting.inline_images[upload.id].present?

      file = open(upload.url).read
      attachments[upload.filename] = file
    end
  end
end
