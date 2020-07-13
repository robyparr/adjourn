class ActionItemsController < ApplicationController
  def create
    @action_item = meeting.action_items.build(item_params)

    if @action_item.save
      render :show, status: :created
    else
      render json: @action_item.errors.full_message, status: :unprocessable_entity
    end
  end

  def update
    if action_item.update(item_params)
      render :show
    else
      render json: action_item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    action_item.destroy
    render json: { message: 'Action item successfully deleted.' }
  end

  def assign
    action_item.attendees << attendee

    render :show
  end

  def unassign
    action_item.attendees.delete attendee

    render :show
  end

  private

  def item_params
    params.require(:action_item).permit(:title, :description, :done)
  end

  def meeting
    @meeting ||= current_user.meetings.find params[:meeting_id]
  end

  def attendee
    @attendee ||= current_user.attendees.find_or_create_by email: params[:email]
  end

  def action_item
    @action_item ||= current_user.action_items.includes(:attendees).find(params[:id])
  end
end
