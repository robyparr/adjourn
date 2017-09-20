# This controller exists simply to
# render partials from models (Meeting).
# Using ActionController::Base directly resulted
# in helper methods not being available.
class ExportController < ActionController::Base
end
