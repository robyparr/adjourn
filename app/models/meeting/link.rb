# typed: true

class Meeting::Link < ApplicationRecord
  belongs_to :from_meeting, class_name: 'Meeting'
  belongs_to :to_meeting, class_name: 'Meeting'
  belongs_to :user

  validate :meetings_are_not_the_same

  LINK_TYPE_OPPOSITE_MAPPINGS = {
    'relates_to' => 'relates_to',
    'follows_up' => 'followed_up_by',
    'followed_up_by' => 'follows_up'
  }.freeze

  LINK_TYPE_TEXT_MAPPINGS = {
    'relates_to' => 'relates to',
    'follows_up' => 'follows up',
    'followed_up_by' => 'followed up by',
  }.freeze

  class << self
    sig do
      params(
        from_meeting: Meeting,
        to_meeting: Meeting,
        link_type: String
      ).returns(Meeting::Link)
    end
    def link_meetings(from_meeting, to_meeting, link_type:)
      new(
        from_meeting: from_meeting,
        to_meeting: to_meeting,
        link_type: link_type,
        user: from_meeting.user,
      )
    end
  end

  sig { params(current_meeting: Meeting).returns(String) }
  def visible_link_text(current_meeting)
    visible_link_type = visible_link_type(current_meeting)
    text = LINK_TYPE_TEXT_MAPPINGS[visible_link_type]
    raise ArgumentError, "No text mapping for #{visible_link_type}" if text.blank?

    text
  end

  sig { params(current_meeting: Meeting).returns(Meeting) }
  def linked_meeting(current_meeting)
    if current_meeting.id == from_meeting_id
      to_meeting
    else
      from_meeting
    end
  end

  private

  sig { params(current_meeting: Meeting).returns(String) }
  def visible_link_type(current_meeting)
    if current_meeting.id == from_meeting_id
      link_type
    else
      LINK_TYPE_OPPOSITE_MAPPINGS.fetch(link_type, 'relates_to')
    end
  end

  def meetings_are_not_the_same
    if from_meeting_id == to_meeting_id
      errors.add :base, 'Cannot link a meeting to itself'
    end
  end
end
