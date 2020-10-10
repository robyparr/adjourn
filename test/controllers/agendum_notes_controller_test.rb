# typed: false
require 'test_helper'

class AgendumNotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create :user
    @meeting = create :meeting, user: @user
    @agendum = create :agendum, meeting: @meeting
    @note = create :agendum_note, meeting: @meeting, agendum: @agendum

    @meeting2 = create :meeting
    @agendum2 = create :agendum, meeting: @meeting2
    @note2 = create :agendum_note, meeting: @meeting2, agendum: @agendum2
  end

  test 'can create an agendum note' do
    params = { agendum_note: { content: "Hey, I'm a note!" } }

    # Non authorized user
    assert_no_difference 'AgendumNote.count' do
      post agenda_agendum_notes_url(@agendum), params: params
    end
    assert_redirected_to new_user_session_url

    sign_in @user

    # Another user's agendum
    assert_no_difference 'AgendumNote.count' do
      post agenda_agendum_notes_url(@agendum2), params: params
    end
    assert_response :not_found

    # Authorized user
    assert_difference ['AgendumNote.count', '@agendum.notes.count'], 1 do
      post agenda_agendum_notes_url(@agendum), params: params
    end
    assert_response :success

    # Make sure that the agendum note has its meeting ID set
    # for search cacheing.
    note = AgendumNote.find_by(content: params[:agendum_note][:content])
    assert_equal @meeting.id, note.meeting_id
  end

  test 'can update an agendum note' do
    params = {
      agendum_note: { content: 'Hey, my content has been changed!' }
    }

    # Non authorized user
    put agendum_note_url(@note), params: params
    assert_redirected_to new_user_session_url

    sign_in @user

    # Another user's note
    put agendum_note_url(@note2), params: params
    assert_response :not_found

    # Current user's note
    put agendum_note_url(@note), params: params

    assert_response :success
    updated_note = assigns(:note)
    assert_not_equal @note.content, updated_note.content
  end

  test 'can delete an agendum note' do
    # Non authorized user
    assert_no_difference 'AgendumNote.count' do
      delete agendum_note_url(@note)
    end
    assert_redirected_to new_user_session_url

    sign_in @user

    # Another user's note
    assert_no_difference 'AgendumNote.count' do
      delete agendum_note_url(@note2)
    end
    assert_response :not_found

    # Current user's note
    assert_difference ['AgendumNote.count', '@agendum.notes.count'], -1 do
      delete agendum_note_url(@note)
    end
    assert_response :success
  end
end
