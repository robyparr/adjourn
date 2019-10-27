FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "email#{n}@example.com" }
    password         { 'password' }
    confirmed_at     { Time.zone.parse('2019-10-27 00:00:00') }
  end
end
