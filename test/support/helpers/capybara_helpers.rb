# typed: false
module Support
  module Helpers
    module CapybaraHelpers
      def find_by_testid(testid)
        find("[data-testid='#{testid}'")
      end
    end
  end
end
