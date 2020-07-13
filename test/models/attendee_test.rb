require 'test_helper'

class AttendeeTest < ActiveSupport::TestCase
  def setup
    @user = create :user
    @attendee = create :attendee, user: @user
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

  test 'email must be unique for the user' do
    existing_user_attendee = create :attendee, user: @user
    @attendee.email = existing_user_attendee.email
    assert_not @attendee.valid?

    existing_different_user_attendee = create :attendee
    @attendee.email = existing_different_user_attendee.email
    assert @attendee.valid?
  end
end
