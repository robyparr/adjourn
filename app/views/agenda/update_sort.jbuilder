json.array! @agenda do |agendum|
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
    json.id           upload.id
    json.filename     upload.filename
    json.content_type upload.content_type
    json.file_size    upload.file_size
    json.agendum_id   upload.agendum_id
  end
end
