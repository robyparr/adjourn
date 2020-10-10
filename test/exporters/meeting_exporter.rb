# typed: false
require 'test_helper'

class ActionItemTest < ActiveSupport::TestCase
  test 'exports to html' do
    meeting_to_export = create :meeting
    meeting_exporter = MeetingExporter.new(meeting_to_export.id)

    html = meeting_exporter.to_html

    assert_not html.blank?
    assert_match meeting_to_export.title, html
  end
end
