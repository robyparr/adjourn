FactoryBot.define do
  factory :attendee do
    transient do
      user { association :user }
    end

    meeting { association :meeting, user: user }
  end
end
