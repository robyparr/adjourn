class MeetingMailer < ApplicationMailer
  def attendees_email(meeting_id)
    meeting = Meeting
      .includes({ agenda: :notes }, :action_items, :attendees)
      .find(meeting_id)

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
      format.html { render html: Meeting.to_html(meeting).html_safe }
    end
  end
end
