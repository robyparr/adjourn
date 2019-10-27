FactoryBot.define do
  factory :action_item do
    transient do
      user { association :user }
    end

    meeting                { association :meeting, user: user }
    sequence(:title)       { |n| "Title #{n}" }
    sequence(:description) { |n| "Description #{n}" }
  end
end
