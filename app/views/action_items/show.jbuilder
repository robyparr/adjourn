json.id          @action_item.id
json.title       @action_item.title
json.description @action_item.description
json.done        @action_item.done

json.attendees @action_item.attendees do |attendee|
  json.id    attendee.id
  json.email attendee.email
end
