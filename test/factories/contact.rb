FactoryBot.define do
  factory :contact do
    user
    sequence(:email) { |n| "contact-bot#{n}@example.com" }
  end
end
