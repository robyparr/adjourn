# typed: false
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
    action_item.contacts << contact

    render :show
  end

  def unassign
    action_item.contacts.delete contact

    render :show
  end

  private

  def item_params
    params.require(:action_item).permit(:title, :description, :done)
  end

  def meeting
    @meeting ||= current_user.meetings.find params[:meeting_id]
  end

  def contact
    @contact ||= current_user.contacts.find_or_create_by email: params[:email]
  end

  def action_item
    @action_item ||= current_user.action_items.includes(:contacts).find(params[:id])
  end
end
