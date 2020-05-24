require 'test_helper'

class AttendeeTest < ActiveSupport::TestCase
  def setup
    @attendee = create :attendee
  end

  test "is valid" do
    assert @attendee.valid?
  end

  test "must have an email address" do
    @attendee.email = ""
    assert_not @attendee.valid?
  end

  test "email address must be longer than 6 characters" do
    @attendee.email = "short"
    assert_not @attendee.valid?
  end

  test "email address must not be longer than 254 characters" do
    @attendee.email = "a" * 255
    assert_not @attendee.valid?
  end
end
