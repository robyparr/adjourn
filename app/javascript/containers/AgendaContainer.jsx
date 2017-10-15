import React from 'react';
import { connect } from 'react-redux';

import AgendumList from '../components/meeting/agendum/agendum_list';

const AgendaContainer = ({ agenda, meetingID }) => {
    return (
        <AgendumList
            agenda={agenda}
            meetingID={meetingID} />
    );
};

const mapStateToProps = state => {
    return {
        agenda: state.agenda,
        meetingID: state.meeting.id
    }
};

export default connect(mapStateToProps)(AgendaContainer);