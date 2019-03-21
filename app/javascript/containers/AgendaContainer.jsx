import React from 'react';
import { connect } from 'react-redux';

import Agenda from '../components/meeting/agendum/Agenda';

const AgendaContainer = ({ agenda, meetingID }) => {
  return (
    <Agenda
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
