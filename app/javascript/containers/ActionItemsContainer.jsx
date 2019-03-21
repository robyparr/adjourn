import React from 'react';
import { connect } from 'react-redux';

import ActionItems from '../components/meeting/action_item/ActionItems';

const ActionItemsContainer = ({ actionItems, meetingID }) => {
  return (
    <ActionItems
      actionItems={actionItems}
      meetingID={meetingID} />
  );
};

const mapStateToProps = state => {
  return {
    actionItems: state.actionItems,
    meetingID: state.meeting.id
  }
};

export default connect(mapStateToProps)(ActionItemsContainer);
