import React from 'react';
import { connect } from 'react-redux';

import Meeting from '../components/meeting/meeting';

const MeetingContainer = ({ meeting }) => {
    return (
        <Meeting {...meeting} />
    );
};

const mapStateToProps = state => {
    return {
        meeting: state.meeting
    }
};

export default connect(mapStateToProps)(MeetingContainer);