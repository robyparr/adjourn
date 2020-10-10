# typed: false
FactoryBot.define do
  factory :attendee, class: Meeting::Attendee do
    transient do
      user { association :user }
    end

    meeting { association :meeting, user: user }
    contact { association :contact, user: user }
  end
end
