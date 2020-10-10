# typed: false
module Support
  module Helpers
    module ResponseHelpers
      def response_json
        JSON.parse(response.body, symbolize_names: true)
      end
    end
  end
end
