require 'test_helper'

class AgendumNotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @meeting = meetings(:one)
    @agendum = @meeting.agenda.first
    @note = @agendum.notes.first
  end
  
  test 'can create an agendum note' do
    assert_difference 'AgendumNote.count', 1 do
      post meeting_agenda_agendum_notes_url(@meeting, @agendum), params: {
        agendum_note: { content: "Hey, I'm a note!" }
      }
    end
    assert_response :created
  end

  test 'can update an agendum note' do
    put meeting_agenda_agendum_note_url(@meeting, @agendum, @note), params: {
      agendum_note: { content: 'Hey, my content has been changed!' }
    }
    assert_response :success

    updated_note = assigns(:note)
    assert_not_equal @note.content, updated_note.content
  end

  test 'can delete an agendum note' do
    assert_difference 'AgendumNote.count', -1 do
      delete meeting_agenda_agendum_note_url(@meeting, @agendum, @note)
    end
    assert_response :success
  end
  
end
