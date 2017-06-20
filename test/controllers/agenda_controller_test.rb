require 'test_helper'

class AgendaControllerTest < ActionDispatch::IntegrationTest
  def setup
    @meeting = meetings(:one)
  end
  
  test "can add agendum to a meeting" do
    assert_difference '@meeting.agenda.count', 1 do
      post meeting_agenda_index_path(@meeting), params: {
        agendum: {
          title: 'agendum',
          description: 'The agendum.'
        }
      }
    end
    assert_response :created
  end

  test "can update an agendum" do
    agendum = @meeting.agenda.first

    patch meeting_agenda_path(@meeting, agendum), params: {
      agendum: {
        title: 'edited agendum',
        description: 'The agendum has been edited.'
      }
    }
    assert_response :success

    updated_agendum = JSON.parse(response.body)
    assert_not_equal updated_agendum['title'], agendum.title
    assert_not_equal updated_agendum['description'], agendum.description
  end

  test "can delete an agendum" do
    agendum = @meeting.agenda.first

    assert_difference '@meeting.agenda.count', -1 do
      delete meeting_agenda_path(@meeting, agendum)
    end
    assert_response :success

    json_response = JSON.parse(response.body) 
    assert_equal json_response['message'], 'Agendum sucessfully deleted.'
  end
  
  
  
end
