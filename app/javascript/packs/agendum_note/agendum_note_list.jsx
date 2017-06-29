import React, { Component } from 'react';

// Controls
import AgendumNote from './agendum_note';

/*
 * Create a list of agendum Notes.
 */
export default class AgendumNoteList extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState(props.notes);
    }

    getInitialState(notes) {
        notes = notes.slice();

        // Add an empty note for the 'new note' interface
        notes.push({});
        
        return { notes: notes };
    }

    handleNewNote = (note) => {
        // Get a copy of the notes array
        var notes = this.state.notes.slice();

        // Remove the last one (empty note)
        notes.splice(-1, 1);

        // Add the newly created note
        notes.push(note);

        // Update state
        this.setState(this.getInitialState(notes));
    }

    render() {
        return(
            <ul className="collection">
                {
                    this.state.notes.map(note => {
                        return (
                            <AgendumNote 
                                key={note.id || 'new'}
                                note={note}
                                meetingID={this.props.meetingID}
                                agendumID={this.props.agendumID}
                                handleNewNote={this.handleNewNote} />
                        )
                    })
                }
            </ul>
        );
    }
}
