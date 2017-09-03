json.id           meeting.id
json.title        meeting.title
json.description  meeting.description
json.start_date   meeting.start_date
json.end_date     meeting.end_date

json.action_items meeting.action_items do |item|
  json.id           item.id
  json.title        item.title
  json.description  item.description
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

  json.notes agendum.notes do |note|
    json.id       note.id
    json.content  note.content
  end  
end
