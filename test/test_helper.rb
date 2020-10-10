# typed: false
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

import_globs = [
  Rails.root.join('test', 'exporters', '*.rb'),
  Rails.root.join('test', 'support', '**', '*.rb'),
]

import_globs.each do |glob|
  Dir.glob(glob).each { |file| require file }
end


class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
  include Support::Helpers::ResponseHelpers

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
end
