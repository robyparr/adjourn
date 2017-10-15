import React from 'react';
import { connect } from 'react-redux';

import Attendees from '../components/meeting/attendee/attendees';

const AttendeeContainer = ({ attendees, meetingID }) => {
    return (
        <Attendees
            attendees={attendees}
            handleAttendeesAddRemove={this.handleAttendeesAddRemove}
            meetingID={meetingID} />
    );
};

const mapStateToProps = state => {
    return {
        attendees: state.attendees,
        meetingID: state.meeting.id
    }
};

export default connect(mapStateToProps)(AttendeeContainer);