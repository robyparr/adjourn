import React, { Component } from 'react';

// Controls
import AgendumNoteContainer from '../../../containers/AgendumNoteContainer';

/*
 * Create a list of agendum notes.
 */
const AgendumNotes = (props) => {
  return (
    <ul className="list">
      {props.notes.map(note => {
        return (
          <AgendumNoteContainer
            key={note.id}
            note={note}
            agendumID={props.agendumID}
            isExistingNote={true} />
        )
      })}

      <AgendumNoteContainer
        key={new Date()}
        agendumID={props.agendumID}
        isExistingNote={false} />
    </ul>
  );
};

export default AgendumNotes;