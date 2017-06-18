require 'test_helper'

class AgendumTest < ActiveSupport::TestCase
  def setup
    @agendum = agendums(:one)
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
end
