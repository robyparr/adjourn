require 'test_helper'

class AgendumNotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @meeting = meetings(:one)
    @agendum = @meeting.agenda.first
    @note = @agendum.notes.first

    @user.meetings << @meeting

    @meeting2 = meetings(:two)
    @agendum2 = @meeting2.agenda.first
    @note2 = @agendum2.notes.first
  end
  
  test 'can create an agendum note' do
    params = { agendum_note: { content: "Hey, I'm a note!" } }

    # Non authorized user
    assert_no_difference 'AgendumNote.count' do
      post meeting_agenda_agendum_notes_url(@meeting, @agendum), params: params
    end
    assert_redirected_to new_user_session_path

    sign_in @user
    
    # Another user's agendum
    assert_no_difference 'AgendumNote.count' do
      post meeting_agenda_agendum_notes_url(@meeting2, @agendum2), 
        params: params
    end
    assert_response :not_found

    # Authorized user
    assert_difference ['AgendumNote.count', '@agendum.notes.count'], 1 do
      post meeting_agenda_agendum_notes_url(@meeting, @agendum), params: params
    end
    assert_response :success

    # Make sure that the agendum note has its meeting ID set
    # for search cacheing.
    note = AgendumNote.find_by_content(params[:agendum_note][:content])
    assert_equal @meeting.id, note.meeting_id
  end

  test 'can update an agendum note' do
    params = {
      agendum_note: { content: 'Hey, my content has been changed!' }
    }

    # Non authorized user
    put meeting_agenda_agendum_note_url(@meeting, @agendum, @note), 
      params: params
    assert_redirected_to new_user_session_path

    sign_in @user

    # Another user's note
    put meeting_agenda_agendum_note_url(@meeting2, @agendum2, @note2),
      params: params
    assert_response :not_found

    # Current user's note
    put meeting_agenda_agendum_note_url(@meeting, @agendum, @note),
      params: params

    assert_response :success
    updated_note = assigns(:note)
    assert_not_equal @note.content, updated_note.content
  end

  test 'can delete an agendum note' do
    # Non authorized user
    assert_no_difference 'AgendumNote.count' do
      delete meeting_agenda_agendum_note_url(@meeting, @agendum, @note)
    end
    assert_redirected_to new_user_session_path

    sign_in @user

    # Another user's note
    assert_no_difference 'AgendumNote.count' do
      delete meeting_agenda_agendum_note_url(@meeting2, @agendum2, @note2)
    end
    assert_response :not_found

    # Current user's note
    assert_difference ['AgendumNote.count', '@agendum.notes.count'], -1 do
      delete meeting_agenda_agendum_note_url(@meeting, @agendum, @note)
    end
    assert_response :success
  end
  
end
