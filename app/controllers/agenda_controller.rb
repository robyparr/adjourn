#
# Controller for Agendum operations.
#
class AgendaController < ApplicationController

  before_action :load_meeting, only: [:create, :update, :destroy]
  before_action :load_agendum, only: [:update, :destroy]

  # POST /meetings/:meeting_id/agenda
  #   Creates a new agendum.
  def create
    agendum = @meeting.agenda.build(agendum_params)
    
    if agendum.save
      render json: agendum, status: :created
    else
      render json: agendum.errors.full_messages, status: :unprocessable_item
    end
  end
  

  # PATCH /meetings/:meeting_id/agenda/:id
  #   Updates an agendum's attributes.
  def update
    if @agendum.update_attributes(agendum_params)
      render json: @agendum
    else
      render json: @agendum.errors.full_messages, status: :unprocessable_item
    end
  end

  # DELETE /meetings/:meeting_id/agenda/:id
  #   Deletes an agendum.
  def destroy
    @agendum.delete
    render json: { message: 'Agendum sucessfully deleted.'}
  end
  

  private
  # Load the meeting object.
  def load_meeting
    @meeting = Meeting.find params[:meeting_id]
  end

  # Load the agendum object.
  def load_agendum
    @agendum = Agendum.find params[:id]
  end

  # Agendum strong params
  def agendum_params
    params.require(:agendum).permit(:title, :description)
  end
  
  
end
