class ActionItemsController < ApplicationController

  before_action :load_meeting, only: [:create]
  before_action :load_item, only: [:update, :destroy]

  # POST /meetings/:meeting_id/action_items
  def create
    item = @meeting.action_items.build(item_params)

    if item.save
      render json: item, status: :created
    else
      render json: item.errors.full_message, status: :unprocessable_entity
    end
  end

  # PUT /action_items/:id
  def update
    if @item.update_attributes(item_params)
      render json: @item
    else
      render json: @item.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /action_items/:id
  def destroy
    @item.destroy
    render json: { message: 'Action item successfully deleted.' }
  end


  private

  def item_params
    params.require(:action_item).permit(:title, :description, :done)
  end

  def load_meeting
    @meeting = current_user.meetings.find(params[:meeting_id])
  end

  def load_item
    @item = ActionItem.find(params[:id])
    not_found and return unless @item.meeting.user == current_user
  end
end
