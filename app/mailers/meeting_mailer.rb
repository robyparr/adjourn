class MeetingMailer < ApplicationMailer
  def attendees_email(meeting_id)
    meeting = Meeting
      .includes({ agenda: :notes }, :action_items, :attendees)
      .find(meeting_id)

    email_options = { 
      from: meeting.user.email, 
      cc: meeting.attendees.map(&:email).uniq,
      subject: "Meeting Notes: #{meeting.title}"
    }

    mail(email_options) do |format|
      format.html { render html: Meeting.to_html(meeting).html_safe }
    end
  end
end
