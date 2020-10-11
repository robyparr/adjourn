FactoryBot.define do
  factory :meeting_link, class: Meeting::Link do
    user
    from_meeting { association :meeting, user: user }
    to_meeting { association :meeting, user: user }
    link_type { 'relates_to' }
  end
end
