import React from 'react';
import { connect } from 'react-redux';

import ActionItems from '../components/meeting/action_item/action_items';

const ActionItemContainer = ({ actionItems, meetingID }) => {
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

export default connect(mapStateToProps)(ActionItemContainer);