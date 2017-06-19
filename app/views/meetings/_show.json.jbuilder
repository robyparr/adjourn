json.id           meeting.id
json.title        meeting.title
json.description  meeting.description
json.start_date   meeting.start_date
json.end_date     meeting.end_date

json.agenda meeting.agenda do |agendum|
  json.id           agendum.id
  json.meeting_id   agendum.meeting_id
  json.title        agendum.title
  json.description  agendum.description
end