# typed: false
require 'test_helper'

class ContactTest < ActiveSupport::TestCase
  def setup
    @user = create :user
    @contact = create :contact, user: @user
  end

  test "is valid" do
    assert @contact.valid?
  end

  test "must have an email address" do
    @contact.email = ""
    assert_not @contact.valid?
  end

  test "email address must be longer than 6 characters" do
    @contact.email = "short"
    assert_not @contact.valid?
  end

  test "email address must not be longer than 254 characters" do
    @contact.email = "a" * 255
    assert_not @contact.valid?
  end

  test 'email must be unique for the user' do
    existing_user_contact = create :contact, user: @user
    @contact.email = existing_user_contact.email
    assert_not @contact.valid?

    existing_different_user_contact = create :contact
    @contact.email = existing_different_user_contact.email
    assert @contact.valid?
  end
end
