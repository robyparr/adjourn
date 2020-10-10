# typed: false
require 'test_helper'

class GoogleAccountTest < ActiveSupport::TestCase
  setup do
    @account = create :google_account
  end

  test "is valid" do
    assert @account.valid?
  end

  test "must have an email" do
    @account.email = ""
    assert_not @account.valid?
  end

  test "email must be unique" do
    @account.email = create(:google_account).email
    assert_not @account.valid?
  end
end
