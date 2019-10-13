import React from 'react';
import { connect } from 'react-redux';

import Agenda from '../components/meeting/agendum/Agenda';

import { updateAgendaSortOrder } from '../actions/agenda';

const AgendaContainer = ({ agenda, meetingID, updateAgendaSortOrder }) => {
  return (
    <Agenda
      agenda={agenda}
      meetingID={meetingID}
      onSort={updateAgendaSortOrder} />
  );
};

const mapStateToProps = state => {
  return {
    agenda:                state.agenda,
    meetingID:             state.meeting.id,
    updateAgendaSortOrder: state.updateAgendaSortOrder
  }
};

export default connect(
  mapStateToProps,
  { updateAgendaSortOrder }
)(AgendaContainer);
