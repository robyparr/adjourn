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
end

json.attendees  meeting.attendees do |attendee|
  json.id     attendee.id
  json.email  attendee.email
end

json.agenda meeting.agenda do |agendum|
  json.id           agendum.id
  json.meeting_id   agendum.meeting_id
  json.title        agendum.title
  json.description  agendum.description
  json.created_at   agendum.created_at

  json.notes agendum.notes do |note|
    json.id         note.id
    json.content    note.content
    json.agendum_id note.agendum_id
    json.created_at note.created_at
  end

  json.uploads agendum.uploads do |upload|
    json.id           upload.id
    json.filename     upload.filename
    json.content_type upload.content_type
    json.file_size    upload.file_size
    json.agendum_id   upload.agendum_id
  end
end
