# typed: false
require 'application_system_test_case'

module Contacts
  class IndexTest < ApplicationSystemTestCase
    setup do
      @user = create :user
      @contact = create :contact, user: @user
    end

    test 'visiting the list' do
      sign_in @user

      visit contacts_url
      assert_selector "h3", text: 'Contacts'
      assert_text @contact.email
    end
  end
end
