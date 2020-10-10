# typed: false
module Support
  module Helpers
    module CapybaraHelpers
      def find_by_testid(testid)
        find("[data-testid='#{testid}'")
      end

      def wait_for_ajax
        sleep 0.5
      end
    end
  end
end
