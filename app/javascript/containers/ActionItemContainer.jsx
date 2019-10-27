import React from 'react';
import { connect } from 'react-redux';

import ActionItem from '../components/meeting/action_item/ActionItem';
import {
  addActionItem,
  updateActionItem,
  deleteActionItem,
  assignAttendeeToActionItem,
  unassignAttendeeFromActionItem
} from '../actions/actionItems';

const ActionItemContainer = ({
  actionItem,
  meetingID,
  attendees,
  addActionItem,
  updateActionItem,
  deleteActionItem,
  assignAttendeeToActionItem,
  unassignAttendeeFromActionItem,
  index
}) => {
  const isExistingItem = actionItem && actionItem.id;

  if (!isExistingItem) {
    return (
      <ActionItem
        actionItem={actionItem}
        isExistingItem={false}
        onActionItemChange={addActionItem}
        meetingID={meetingID}
        index={index} />
    );
  }

  return (
    <ActionItem
      actionItem={actionItem}
      isExistingItem={true}
      onActionItemChange={partialActionItem => updateActionItem(actionItem.id, partialActionItem)}
      onActionItemDelete={deleteActionItem}
      onAssignToActionItem={email => assignAttendeeToActionItem(actionItem.id, email)}
      onUnassignFromActionItem={email => unassignAttendeeFromActionItem(actionItem.id, email)}
      meetingID={meetingID}
      attendees={attendees}
      index={index} />
  );
};

const mapStateToProps = state => {
  return {
    meetingID: state.meeting.id,
    attendees: state.attendees
  }
};

export default connect(
  mapStateToProps,
  {
    addActionItem,
    updateActionItem,
    deleteActionItem,
    assignAttendeeToActionItem,
    unassignAttendeeFromActionItem
  }
  )(ActionItemContainer);
