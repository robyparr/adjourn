json.id           meeting.id
json.title        meeting.title
json.description  meeting.description
json.start_date   meeting.start_date
json.end_date     meeting.end_date

json.action_items meeting.action_items do |item|
  json.id           item.id
  json.title        item.title
  json.description  item.description
  json.done         item.done

  json.contacts item.contacts do |contact|
    json.id    contact.id
    json.email contact.email
  end
end

json.attendees meeting.attendees,
  partial: 'meeting/attendees/attendee.json',
  as: :attendee

json.agenda meeting.agenda do |agendum|
  json.id           agendum.id
  json.meeting_id   agendum.meeting_id
  json.title        agendum.title
  json.description  agendum.description
  json.position     agendum.position
  json.created_at   agendum.created_at

  json.notes agendum.notes do |note|
    json.id         note.id
    json.content    note.content
    json.agendum_id note.agendum_id
    json.created_at note.created_at
  end

  json.uploads agendum.uploads do |upload|
    json.id              upload.id
    json.filename        upload.filename
    json.content_type    upload.content_type
    json.file_size       upload.file_size
    json.uploadable_id   upload.uploadable_id
    json.uploadable_type upload.uploadable_type
  end
end
