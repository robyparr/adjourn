require 'test_helper'

class MeetingTest < ActiveSupport::TestCase
  def setup
    @meeting = meetings(:one)
    @meeting.user = users(:one)
  end

  test 'meeting is valid' do
    assert @meeting.valid?
  end

  test 'meeting must have a title' do
    @meeting.title = ' '
    assert_not @meeting.valid?
  end

  test 'meeting must have a start_date' do
    @meeting.start_date = nil
    assert_not @meeting.valid?
  end
  
  test 'meeting must have an end_date after the start_date' do
    @meeting.start_date = DateTime.now
    @meeting.end_date = @meeting.start_date + 1

    # end_date is present
    assert @meeting.valid?

    # end_date is the same as start_date
    @meeting.end_date = @meeting.start_date
    assert_not @meeting.valid?

    # end_date is after start_date
    @meeting.end_date -= 1
    assert_not @meeting.valid?
  end

  test 'meeting may have an agenda' do
    assert @meeting.agenda.count > 0
  end
  
end
