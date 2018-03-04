class ProfileViewModel

  attr_accessor :meetings_count, :uploads_total

  def initialize(user)
    @uploads_total = Upload.uploads_size_total(user)
    @meetings_count = user.meetings.count
  end
end