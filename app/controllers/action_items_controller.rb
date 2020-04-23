class ActionItemsController < ApplicationController
  before_action :load_meeting, only: %i[create]
  before_action :load_item, only: %i[update destroy assign unassign]

  def create
    @item = @meeting.action_items.build(item_params)

    if @item.save
      render :show, status: :created
    else
      render json: @item.errors.full_message, status: :unprocessable_entity
    end
  end

  def update
    if @item.update(item_params)
      render :show
    else
      render json: @item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @item.destroy
    render json: { message: 'Action item successfully deleted.' }
  end

  def assign
    @item.attendees << attendee

    render :show
  end

  def unassign
    @item.attendees.delete attendee

    render :show
  end

  private

  def item_params
    params.require(:action_item).permit(:title, :description, :done)
  end

  def load_meeting
    @meeting = current_user.meetings.find(params[:meeting_id])
  end

  def attendee
    current_user.attendees.find_or_create_by(email: params[:email])
  end

  def load_item
    @item = ActionItem.includes(:attendees).find(params[:id])
    not_found and return unless @item.meeting.user == current_user
  end
end
