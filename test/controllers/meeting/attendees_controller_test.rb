require 'test_helper'

class Meeting::AttendeesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create :user
    @meeting = create :meeting, user: @user
    @contact = create :contact, user: @user

    @attend_existing_params = { email: @contact.email }
    @attend_new_params = { email: 'contact3@example.com' }
  end

  #  Attend tests
  test "guests can't add contacts to a meeting" do
    assert_no_difference [
      '@meeting.attendees.count',
      '@user.contacts.count'
    ] do
      post meeting_attendees_url(@meeting), params: @attend_existing_params
      assert_redirected_to new_user_session_url
    end
  end

  test "users can't add contacts to another user's meeting" do
    sign_in create :user

    assert_no_difference [
      '@meeting.attendees.count',
      '@user.contacts.count'
    ] do
      post meeting_attendees_url(@meeting), params: @attend_existing_params
      assert_response :not_found
    end
  end

  test "an existing contact can attend a meeting" do
    sign_in @user

    assert_difference '@meeting.attendees.count', 1 do
      assert_no_difference '@user.contacts.count' do
        post meeting_attendees_url(@meeting), params: @attend_existing_params
        assert_response :success
      end
    end
  end

  test "a new contact can attend a meeting" do
    sign_in @user

    assert_difference [
      '@meeting.attendees.count',
      '@user.contacts.count'
    ], 1 do
      post meeting_attendees_url(@meeting), params: @attend_new_params
      assert_response :success
    end
  end

  test "a contact can't attend a meeting twice" do
    sign_in @user

    post meeting_attendees_url(@meeting), params: @attend_existing_params
    assert_response :success

    assert_no_difference ['@meeting.attendees.count', 'Contact.count'] do
      post meeting_attendees_url(@meeting), params: @attend_existing_params
      assert_response :unprocessable_entity
    end
  end

  # Unattnend tests
  test "guests can't remove contacts from a meeting" do
    assert_no_difference [
      '@meeting.attendees.count',
      '@user.contacts.count'
    ] do
      delete meeting_attendees_url(@meeting), params: @attend_existing_params
      assert_redirected_to new_user_session_url
    end
  end

  test "users can't delete contacts of another user's meeting" do
    sign_in create :user

    assert_no_difference [
      '@meeting.attendees.count',
      '@user.contacts.count'
    ] do
      delete meeting_attendees_url(@meeting), params: @attend_existing_params
      assert_response :not_found
    end
  end

  test "a contact can be removed from a meeting" do
    sign_in @user

    @meeting.add_attendee @contact.email
    assert_difference '@meeting.attendees.count', -1 do
      assert_no_difference ['@user.contacts.count', 'Contact.count'] do
        delete meeting_attendees_url(@meeting), params: @attend_existing_params
        assert_response :success
      end
    end
  end
end
