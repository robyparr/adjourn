# typed: false
require 'test_helper'

class ContactsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create :user
    @contact = create :contact, user: @user

    @autocomplete_params = { email: 'contact' }
  end

  # Autocomplete tests
  test "guests can't access atendees autocomplete" do
    get autocomplete_contacts_url, params: @autocomplete_params
    assert_redirected_to new_user_session_url
  end

  test "user can autocomplete his contacts" do
    sign_in @user

    get autocomplete_contacts_url, params: @autocomplete_params
    assert_response :success

    assert_equal 1, response_json.size
    assert_equal @contact.email, response_json.dig(0, :email)
  end
end
