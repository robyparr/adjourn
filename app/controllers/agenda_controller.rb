class AgendaController < ApplicationController
  before_action :load_agendum, only: [:update, :destroy]

  def create
    meeting = current_user.meetings.find(params[:meeting_id])
    agendum = meeting.agenda.build(agendum_params)

    if agendum.save
      render json: agendum, status: :created
    else
      render json: agendum.errors.full_messages, status: :unprocessable_item
    end
  end

  def update
    if @agendum.update_attributes(agendum_params)
      render json: @agendum
    else
      render json: @agendum.errors.full_messages, status: :unprocessable_item
    end
  end

  def destroy
    @agendum.destroy
    render json: { message: 'Agendum sucessfully deleted.'}
  end

  def update_sort
    ActiveRecord::Base.transaction do
      meeting = current_user.meetings.find(params[:meeting_id])
      @agenda = meeting.agenda.includes(%i[notes uploads]).map do |agendum|
        new_position = agenda_ids.index agendum.id
        agendum.update! position: new_position

        agendum
      end
    end
  end

  private

  def load_agendum
    @agendum = current_user.agenda.find(params[:id])
  end

  def agendum_params
    params.require(:agendum).permit(:title, :description)
  end

  def agenda_ids
    return [] unless params[:agenda_ids].present?

    params[:agenda_ids].map(&:to_i)
  end
end
