import React from 'react';
import { connect } from 'react-redux';

import AgendumNote from '../components/meeting/agendum_note/AgendumNote';
import {
  addAgendumNote,
  deleteAgendumNote,
  updateAgendumNote
} from '../actions/agendumNotes';

const AgendumNoteContainer = ({
  isExistingNote,
  note,
  agendumID,
  addAgendumNote,
  deleteAgendumNote,
  updateAgendumNote
}) => {
  if (!isExistingNote) {
    return (
      <AgendumNote
        onNoteChange={(agendumNote) => addAgendumNote(agendumID, agendumNote)}
        isExistingNote={isExistingNote} />
    );
  }

  return (
    <AgendumNote
      note={note}
      onNoteChange={partialNote => updateAgendumNote(agendumID, note.id, partialNote)}
      onNoteDelete={() => deleteAgendumNote(agendumID, note.id)}
      isExistingNote={isExistingNote} />
  );
};

const mapStateToProps = state => {
  return {
    agenda: state.agenda,
    meetingID: state.meeting.id
  }
};

export default connect(
  mapStateToProps,
  { addAgendumNote, deleteAgendumNote, updateAgendumNote }
)(AgendumNoteContainer);
