class AgendumNotesController < ApplicationController
  before_action :load_note, except: [:create]

  def create
    agendum = current_user.agenda.find(params[:agenda_id])
    note = agendum.notes.build(note_params)
    note.meeting_id = agendum.meeting_id

    if note.save
      render json: note, status: :created
    else
      render json: note.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @note.update_attributes(note_params)
      render json: @note
    else
      render json: @note.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    render json: { message: 'Successfully deleted' } if @note.destroy
  end

  private

  def load_note
    @note = current_user.notes.find(params[:id])
  end
  
  def note_params
    params.require(:agendum_note).permit(:content)
  end
  
end
