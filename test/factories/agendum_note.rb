# typed: false
FactoryBot.define do
  factory :agendum_note do
    meeting
    agendum { association :agendum, meeting: meeting }
    content { 'Example note' }
  end
end
