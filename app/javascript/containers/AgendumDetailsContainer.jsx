import React from 'react';
import { connect } from 'react-redux';

import AgendumDetails from '../components/meeting/agendum/AgendumDetails';

const AgendumDetailsContainer = ({ agendum, agendumNotes, agendumUploads }) => {
  return (
    <AgendumDetails
      agendum={agendum}
      agendumNotes={agendumNotes}
      agendumUploads={agendumUploads} />
  );
};

const mapStateToProps = (state, ownProps) => {
  const selectedAgendum = state.agenda.find(agendum => agendum.selected);

  if (selectedAgendum) {
    var notes = state.agendumNotes
      .filter(note => note.agendum_id === selectedAgendum.id);

    var uploads = state.agendumUploads
      .filter(upload => upload.agendum_id === selectedAgendum.id);
  }

  return {
    agendum: selectedAgendum,
    agendumNotes: notes || [],
    agendumUploads: uploads || []
  };
};

export default connect(
  mapStateToProps
)(AgendumDetailsContainer);