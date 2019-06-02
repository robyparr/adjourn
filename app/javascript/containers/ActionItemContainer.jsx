import React from 'react';
import { connect } from 'react-redux';

import ActionItem from '../components/meeting/action_item/ActionItem';
import {
  addActionItem,
  updateActionItem,
  deleteActionItem
} from '../actions/actionItems';

const ActionItemContainer = ({
  actionItem,
  meetingID,
  addActionItem,
  updateActionItem,
  deleteActionItem,
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
      meetingID={meetingID}
      index={index} />
  );
};

const mapStateToProps = state => {
  return {
    meetingID: state.meeting.id
  }
};

export default connect(
  mapStateToProps,
  { addActionItem, updateActionItem, deleteActionItem }
  )(ActionItemContainer);
