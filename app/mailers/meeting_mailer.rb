class MeetingMailer < ApplicationMailer
  def attendees_email(meeting)
    meeting.attendees.each { |attendee| send_attendees_email(attendee, meeting)}
  end

  private
  def send_attendees_email(attendee, meeting)
    email_options = { 
      from: meeting.user.email, 
      to: attendee.email,
      subject: "Meeting Notes: #{meeting.title}"
    }
    mail(email_options) do |format|
      format.html { render html: meeting.to_html.html_safe }
    end
  end
end
