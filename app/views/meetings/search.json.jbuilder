json.array! @results do |result|
  json.content      truncate(result.content, length: 200)
  json.result_type  t(result.searchable_type)

  json.meeting do
    json.title        result.searchable.meeting.title
    json.date         result.searchable.meeting.start_date
    json.resource_url meeting_url(result.searchable.meeting)
  end

  json.result result.searchable
end

