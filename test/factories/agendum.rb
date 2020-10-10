# typed: false
FactoryBot.define do
  factory :agendum do
    meeting
    sequence(:title) { |n| "Agendum #{n}" }
  end
end
