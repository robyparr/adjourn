json.id                link.id
json.from_meeting_id   link.from_meeting_id
json.to_meeting_id     link.to_meeting_id
json.link_type         link.link_type
json.linked_meeting do
  meeting = link.linked_meeting(current_meeting)

  json.id    meeting.id
  json.title meeting.title
end
json.visible_link_text link.visible_link_text(current_meeting).capitalize
