# typed: false
require 'test_helper'

class AgendumTest < ActiveSupport::TestCase
  def setup
    @agendum = create :agendum
  end

  test 'agendum is valid' do
    assert @agendum.valid?
  end

  test 'agendum must have a title' do
    @agendum.title = " "
    assert_not @agendum.valid?
  end

  test 'agendum must have a meeting' do
    @agendum.meeting = nil
    assert_not @agendum.valid?
  end

  test 'agendum can have notes' do
    create :agendum_note, agendum: @agendum
    assert_not_empty @agendum.notes
  end
end
