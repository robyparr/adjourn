class MeetingMailer < ApplicationMailer
  def attendees_email(meeting)
    meeting.attendees.each { |attendee| send_attendees_email(attendee, meeting)}
  end

  private
  def send_attendees_email(attendee, meeting)
    mail(to: attendee.email) do |format|
      format.html { render html: meeting.to_html.html_safe }
    end
  end
end
