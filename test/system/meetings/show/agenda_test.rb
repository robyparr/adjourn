# typed: false
require 'application_system_test_case'

module Meetings
  module Show
    class AgendaTest < ApplicationSystemTestCase
      attr_reader :user,
                  :meeting

      setup do
        @user = create :user
        @meeting = create :meeting, user: @user
      end

      test 'adding an agendum' do
        sign_in user
        visit meeting_url meeting
        assert_equal 0, all('.agenda .agendum:not([data-testid="agendum-new"]').count

        new_agendum_input = find_by_testid('agendum-new').find('input')
        new_agendum_input.send_keys 'test'
        new_agendum_input.send_keys :enter

        sleep 0.1
        assert_equal 1, all('.agenda .agendum:not([data-testid="agendum-new"]').count

        new_agendum = meeting.agenda.last
        new_agendum_card_title = find_by_testid("agendum-#{new_agendum.id}").find('.card-title')
        assert_equal 'test', new_agendum_card_title.text
      end

      test "Editing an agendum's title" do
        agendum = create :agendum, meeting: meeting

        sign_in user
        visit meeting_url meeting

        agendum_card = find_by_testid("agendum-#{agendum.id}")
        title_el = agendum_card.find('.card-title .inline-editor')
        title_el.click
        title_el.find('input').send_keys(' updated').send_keys :enter

        sleep 0.1
        updated_title = "#{agendum.title} updated"
        assert_equal updated_title, title_el.text
        assert_equal updated_title, agendum.reload.title
      end
    end
  end
end
