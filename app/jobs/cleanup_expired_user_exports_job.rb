# typed: true
class CleanupExpiredUserExportsJob < ApplicationJob
  def perform
    User::Export.expired.find_each do |export|
      export.destroy
    end
  end
end
