# typed: false
require "application_system_test_case"

module Users
  class RegistrationsTest < ApplicationSystemTestCase
    test 'signup' do
      visit new_user_registration_url
      assert_selector ".card-title", text: "Sign Up"

      assert_difference 'User.count', 1 do
        fill_in 'Email', with: 'new_user@example.com'
        fill_in 'Password', with: 'password123'
        fill_in 'Password Confirmation', with: 'password123'
        click_button 'Sign up'
      end

      new_user = User.last
      assert_equal 'new_user@example.com', new_user.email
    end
  end
end
