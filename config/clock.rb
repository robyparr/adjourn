require 'clockwork'
require 'active_support/time'
require './config/boot'
require './config/environment'

module Clockwork
  handler do |job|
    job.constantize.perform_later
  end

  every 1.day, 'CleanupExpiredUserExportsJob'
end
