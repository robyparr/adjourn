# typed: false
require 'test_helper'

class AgendaControllerTest < ActionDispatch::IntegrationTest
  def setup
    # Current user and their data
    @user = create :user
    @meeting = create :meeting, user: @user
    @agendum = create :agendum, meeting: @meeting

    # Setting the user in the meetings fixture isn't working
    # for some reason.
    # @user.meetings << @meeting

    # Another user's data
    @meeting2 = create :meeting
    @agendum2 = create :agendum, meeting: @meeting2
  end

  test "can add agendum to a meeting" do
    params = {
      agendum: {
        title: 'agendum',
        description: 'The agendum.'
      }
    }

    # Non authorized user
    assert_no_difference 'Agendum.count' do
      post meeting_agenda_index_path(@meeting), params: params
    end
    assert_redirected_to new_user_session_path

    sign_in @user

    # Another user's agenda
    assert_no_difference 'Agendum.count' do
      post meeting_agenda_index_path(@meeting2), params: params
    end
    assert_response :not_found

    # Current user's agenda
    assert_difference ['Agendum.count', '@meeting.agenda.count'], 1 do
      post meeting_agenda_index_path(@meeting), params: params
    end
    assert_response :created
  end

  test "can update an agendum" do
    params = {
      agendum: {
        title: 'edited agendum',
        description: 'The agendum has been edited.'
      }
    }

    # Unauthorized user
    patch agenda_path(@agendum), params: params
    assert_redirected_to new_user_session_path

    sign_in @user

    # Another user's agenda
    patch agenda_path(@agendum2), params: params
    assert_response :not_found

    # Current user's agenda
    patch agenda_path(@agendum), params: params
    assert_response :success

    updated_agendum = JSON.parse(response.body)
    assert_not_equal updated_agendum['title'], @agendum.title
    assert_not_equal updated_agendum['description'], @agendum.description
  end

  test "can delete an agendum" do
    # Non authorized user
    assert_no_difference 'Agendum.count' do
      delete agenda_path(@agendum)
    end
    assert_redirected_to new_user_session_path

    sign_in @user

    # Another user's agendum
    assert_no_difference 'Agendum.count' do
      delete agenda_path(@agendum2)
    end
    assert_response :not_found

    # Corrent user's agendum
    assert_difference ['Agendum.count', '@meeting.agenda.count'], -1 do
      delete agenda_path(@agendum)
    end
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal json_response['message'], 'Agendum successfully deleted.'
  end

  test 'can update the position of agenda items' do
    agenda_ids = @meeting.agenda_ids.to_a
    sorted_ids = agenda_ids.reverse

    patch update_sort_meeting_agenda_index_path(@meeting, agenda_ids: sorted_ids)
    assert_redirected_to new_user_session_path

    sign_in @user

    patch update_sort_meeting_agenda_index_path(@meeting, agenda_ids: sorted_ids)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal json_response['message'], 'Agenda successfully sorted.'

    updated_ids = @meeting.reload.agenda_ids.to_a
    assert_equal updated_ids, sorted_ids
  end
end
