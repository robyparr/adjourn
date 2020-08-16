json.merge! user.attributes_for_json_export

json.meetings user.meetings do |meeting|
  json.merge! meeting.attributes_for_json_export

  json.agenda meeting.agenda do |agendum|
    json.merge! agendum.attributes_for_json_export

    json.notes agendum.notes do |note|
      json.merge! note.attributes_for_json_export
    end

    json.uploads agendum.uploads do |upload|
      json.merge! upload.attributes_for_json_export
    end
  end

  json.action_items meeting.action_items do |action_item|
    json.merge! action_item.attributes_for_json_export
    json.assigned_to action_item.contacts do |contact|
      json.contact_id contact.id
    end
  end

  json.attendees meeting.attendees do |attendee|
    json.merge! attendee.attributes_for_json_export
  end
end

json.contacts user.contacts do |contact|
  json.merge! contact.attributes_for_json_export
end

json.google_accounts user.google_accounts do |google_account|
  json.merge! google_account.attributes_for_json_export

  json.google_calendars google_account.google_calendars do |google_calendar|
    json.merge! google_calendar.attributes_for_json_export
  end
end
