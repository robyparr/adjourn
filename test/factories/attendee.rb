FactoryBot.define do
  factory :attendee do
    user
    sequence(:email) { |n| "attendee-bot#{n}@example.com" }
  end
end
