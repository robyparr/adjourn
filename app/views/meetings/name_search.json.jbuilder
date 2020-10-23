json.array! @results do |meeting|
  json.id         meeting.id
  json.title      meeting.title
  json.start_date meeting.start_date
end
