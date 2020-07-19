json.id          @action_item.id
json.title       @action_item.title
json.description @action_item.description
json.done        @action_item.done

json.contacts @action_item.contacts do |contact|
  json.id    contact.id
  json.email contact.email
end
