json.id          @item.id
json.title       @item.title
json.description @item.description
json.done        @item.done

json.attendees @item.attendees do |attendee|
  json.id    attendee.id
  json.email attendee.email
end
