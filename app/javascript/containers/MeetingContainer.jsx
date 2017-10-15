import React from 'react';
import { connect } from 'react-redux';

import Meeting from '../components/meeting/Meeting';
import { updateMeeting } from '../actions/meetings';

const MeetingContainer = ({ meeting, updateMeeting }) => {

    const onFieldUpdate = (field, value) => {
        const meetingUpdate = Object.assign({}, meeting, { 
            [field]: value 
        });
        updateMeeting(meetingUpdate);
    };

    return (
        <Meeting 
            {...meeting}
            onFieldUpdate={onFieldUpdate} />
    );
};

const mapStateToProps = state => {
    return {
        meeting: state.meeting
    }
};

export default connect(
    mapStateToProps,
    { updateMeeting }
)(MeetingContainer);