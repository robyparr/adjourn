class MeetingMailer < ApplicationMailer
  def attendees_email(meeting_id)
    meeting = Meeting
      .includes({ agenda: [:notes, :uploads] }, :action_items, :attendees)
      .find(meeting_id)

    email_options = {
      reply_to: meeting.user.email,
      cc: meeting.attendees.map(&:email).uniq,
      subject: "Meeting Notes: #{meeting.title}"
    }

    meeting.agenda.flat_map(&:uploads).each do |upload|
      file = open(upload.url).read
      attachments[upload.filename] = file
    end

    mail(email_options) do |format|
      format.html { render html: Meeting.to_html(meeting).html_safe }
    end
  end
end
