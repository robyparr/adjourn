require 'test_helper'

class ProfileControllerTest < ActionDispatch::IntegrationTest

  test "Guest users can't access the profile page" do
    get profile_url
    assert_redirected_to :new_user_session
  end

  test "show's the user's profile" do
    sign_in users(:one)

    get profile_url
    assert_response :success
    assert_match users(:one).email, response.body
  end
end
