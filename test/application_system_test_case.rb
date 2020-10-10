# typed: true
require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  # driven_by :selenium, using: :chrome, screen_size: [1400, 1400]
  driven_by :selenium, using: :headless_chrome

  ActionController::Base.allow_forgery_protection = true

  include Devise::Test::IntegrationHelpers
  include Support::Helpers::CapybaraHelpers

  def find_by_testid(test_id)
    find("[data-testid='#{test_id}'")
  end
end
