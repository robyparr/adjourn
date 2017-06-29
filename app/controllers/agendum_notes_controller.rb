class AgendumNotesController < ApplicationController

  before_action :load_agendum, only: [:create]
  before_action :load_note, except: [:create]

  # POST /meetings/:meeting_id/agenda/:agenda_id/notes
  #   Create a new note on the meeting agendum.
  def create
    note = @agendum.notes.build(note_params)

    if note.save
      render json: note, status: :created
    else
      render json: note.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PUT /meetings/:meeting_id/agenda/:agenda_id/notes/:id
  #   Update a meeting agendum note.
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

  def load_agendum
    @agendum = Agendum.find(params[:agenda_id])
  end

  def load_note
    @note = AgendumNote.find(params[:id])
  end
  
  def note_params
    params.require(:agendum_note).permit(:content)
  end
  
end
