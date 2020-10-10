# typed: false
FactoryBot.define do
  factory :google_account do
    user
    email { user.email }
    refresh_token { 'fake-refresh-token' }
  end
end
