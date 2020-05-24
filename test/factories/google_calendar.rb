FactoryBot.define do
  factory :google_calendar do
    google_account
    sequence(:google_id) { |n| n.to_s }
  end
end
