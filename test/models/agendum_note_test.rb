require 'test_helper'

class AgendumNoteTest < ActiveSupport::TestCase
  def setup
    @note = create :agendum_note
  end

  test "agendum note is valid" do
    assert @note.valid?
  end

  test "agendum must have content" do
    @note.content = " "
    assert_not @note.valid?
  end
end
