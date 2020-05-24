require 'test_helper'

class ProfileControllerTest < ActionDispatch::IntegrationTest

  test "Guest users can't access the profile page" do
    get profile_url
    assert_redirected_to :new_user_session
  end

  test "show's the user's profile" do
    user = create :user
    sign_in user

    get profile_url
    assert_response :success
    assert_match user.email, response.body
  end
end
