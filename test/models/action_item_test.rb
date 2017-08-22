require 'test_helper'

class ActionItemTest < ActiveSupport::TestCase
  def setup
    @action_item = action_items(:one)
  end

  test "is valid" do
    @action_item.valid?
  end

  test "must have a title" do
    @action_item.title = " "
    assert_not @action_item.valid?
  end
end
