require 'test_helper'

class ActionItemsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @meeting = meetings(:one)
    @item = action_items(:one)

    @item_params = {
      action_item: {
        title: 'test',
        description: 'test description'
      }
    }
  end

  # Create tests
  test "guests can't create action items" do
    assert_no_difference 'ActionItem.count' do
      post meeting_action_items_url(@meeting), params: @item_params

    end
    assert_redirected_to new_user_session_url
  end

  test "unauthorized users can't create action items" do
    sign_in users(:two)

    assert_no_difference 'ActionItem.count' do
      post meeting_action_items_url(@meeting), params: @item_params

    end
    assert_response :not_found
  end

  test "can create an action item" do
    sign_in @user

    assert_difference ['ActionItem.count', '@meeting.action_items.count'], 1 do
      post meeting_action_items_url(@meeting), params: @item_params
    end
    assert_response :success

    item_json = JSON.parse(response.body)
    item = ActionItem.find(item_json['id'])

    expected_title = @item_params[:action_item][:title]
    expected_description = @item_params[:action_item][:description]

    assert_equal expected_title, item.title
    assert_equal expected_description, item.description
  end

  # Update tests
  test "guests can't modify action items" do
    current_title = @item.title

    put action_item_url(@item), params: @item_params
    assert_redirected_to new_user_session_url

    assert_equal current_title, @item.reload.title
  end

  test "unauthorized users can't modify action items" do
    sign_in users(:two)
    current_title = @item.title

    put action_item_url(@item), params: @item_params

    assert_equal current_title, @item.reload.title
    assert_response :not_found
  end

  test "can modify action items" do
    sign_in @user
    current_title = @item.title
    
    put action_item_url(@item), params: @item_params

    @item.reload
    assert_not_equal current_title, @item.title
    assert_equal @item.title, 'test'
  end

  test "Unauthorized users can't assign action items" do
    action_item = create(:action_item, user: @user)
    attendee    = create(:attendee, user: @user)

    # Guests
    assert_no_difference 'action_item.attendees.count' do
      post assign_action_item_url(action_item), params: { email: attendee.email }
      assert_redirected_to new_user_session_url
    end

    # Unauthorized user
    other_user = create(:user)
    sign_in other_user

    assert_no_difference 'action_item.attendees.count' do
      post assign_action_item_url(action_item), params: { email: attendee.email }
      assert_response :not_found
    end
  end

  test 'can assign an attendee to an action item' do
    action_item = create(:action_item, user: @user)
    attendee    = create(:attendee, user: @user)

    sign_in @user
    assert_difference 'action_item.attendees.count', 1 do
      assert_no_difference 'Attendee.count' do
        post assign_action_item_url(action_item), params: { email: attendee.email }
        assert_response :ok
      end
    end
  end

  test 'can assign create a previously non-existing attendee and assign to action item' do
    action_item        = create(:action_item, user: @user)
    non_existing_email = build(:attendee).email

    sign_in @user
    assert_difference 'action_item.attendees.count', 1 do
      assert_difference 'Attendee.count', 1 do
        post assign_action_item_url(action_item), params: { email: non_existing_email }
        assert_response :ok
      end
    end
  end

  test "Unauthorized users can't unassign action items" do
    action_item = create(:action_item, user: @user)
    attendee    = create(:attendee, user: @user)

    # Guests
    assert_no_difference 'action_item.attendees.count' do
      post unassign_action_item_url(action_item), params: { email: attendee.email }
      assert_redirected_to new_user_session_url
    end

    # Unauthorized user
    other_user = create(:user)
    sign_in other_user

    assert_no_difference 'action_item.attendees.count' do
      post unassign_action_item_url(action_item), params: { email: attendee.email }
      assert_response :not_found
    end
  end

  test 'can unassign an attendee to an action item' do
    attendee    = create(:attendee, user: @user)
    action_item = create(:action_item, user: @user, attendees: [attendee])

    sign_in @user
    assert_difference 'action_item.attendees.count', -1 do
      assert_no_difference 'Attendee.count' do
        post unassign_action_item_url(action_item), params: { email: attendee.email }
        assert_response :ok
      end
    end
  end

  # Delete tests
  test "guests can't delete action items" do
    assert_no_difference 'ActionItem.count' do
      delete action_item_url(@item)
    end
    assert_redirected_to new_user_session_url
  end

  test "unauthorized users can't delete action items" do
    sign_in users(:two)
    
    assert_no_difference 'ActionItem.count' do
      delete action_item_url(@item), params: @item_params
    end
    assert_response :not_found
  end

  test "can modify delete items" do
    sign_in @user
    
    assert_difference 'ActionItem.count', -1 do
      delete action_item_url(@item), params: @item_params
    end
    assert_response :success
  end
end
