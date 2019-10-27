FactoryBot.define do
  factory :meeting do
    user
    sequence(:title)       { |n| "Title #{n}" }
    sequence(:description) { |n| "Description #{n}" }
    start_date             { Time.zone.parse('2019-01-01 10:00:00') }
    end_date               { Time.zone.parse('2019-01-01 10:30:00') }
  end
end
