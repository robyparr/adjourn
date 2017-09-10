# Preview all emails at http://localhost:3000/rails/mailers/meeting_mailer
class MeetingMailerPreview < ActionMailer::Preview
  def attendees_email
    MeetingMailer.attendees_email(Meeting.first.id)
  end
end
