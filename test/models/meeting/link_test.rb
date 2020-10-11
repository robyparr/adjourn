require 'test_helper'

class Meeting::LinkTest < ActiveSupport::TestCase
  describe 'cannot link a meeting to itself' do
    let(:user) { create :user }
    let(:meeting) { create :meeting, user: user }

    it 'prevents creating links to the same meetings' do
      link = build :meeting_link, from_meeting: meeting, to_meeting: meeting, user: user

      assert_equal false, link.valid?
    end
  end

  describe '.link_meetings' do
    let(:user) { create :user }
    let(:from_meeting) { create :meeting, user: user }
    let(:to_meeting) { create :meeting, user: user }

    it 'creates a new link' do
      new_link =
        described_class.link_meetings(
          from_meeting,
          to_meeting,
          link_type: 'follows_up',
        )

      assert_equal Meeting::Link, new_link.class
      assert_equal from_meeting,  new_link.from_meeting
      assert_equal to_meeting,    new_link.to_meeting
      assert_equal 'follows_up',  new_link.link_type
      assert_equal user,          new_link.user
      assert_equal false,         new_link.persisted?
    end
  end

  describe '#visible_link_text(current_meeting)' do
    let(:link) { create :meeting_link }

    {
      'relates_to' => ['relates to', 'relates to'],
      'follows_up' => ['follows up', 'followed up by'],
      'followed_up_by' => ['followed up by', 'follows up'],
    }.each do |link_type, messages|
      it "returns a user-friendly message for #{link_type} based on the 'current' meeting" do
        link.link_type = link_type
        from_message, to_message = messages

        assert_equal from_message, link.visible_link_text(link.from_meeting)
        assert_equal to_message,   link.visible_link_text(link.to_meeting)
      end
    end

    it 'raises an error if it cannot find a message based on the link type' do
      link.link_type = 'unsupported'
      assert_raises ArgumentError do
        link.visible_link_text(link.from_meeting)
      end
    end
  end

  describe '#linked_meeting' do
    let(:link) { create :meeting_link }
    it 'returns the opposite meeting based on whatever the current_meeting is' do
      assert_equal link.from_meeting, link.linked_meeting(link.to_meeting)
      assert_equal link.to_meeting, link.linked_meeting(link.from_meeting)
    end
  end
end
