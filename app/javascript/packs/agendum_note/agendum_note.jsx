import React, { Component } from 'react';

// Controls
import { RIETextArea } from 'riek';
import Dialog  from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// Utils
import axios from 'axios';
import Utils from 'utils';

/*
 * A single Agendum Note.
 */
export default class AgendumNote extends Component {
    constructor(props) {
        super(props);
        this.state = { note: props.note };
    }

    /*
     * Handle adding a new note to the agendum.
     */
    addNewNote = (prop) => {
        var url = `/meetings/${this.props.meetingID}/agenda/${this.props.agendumID}/notes`;

        // Create the new note
        axios.post(url, { 
            authenticity_token: Utils.getAuthenticityToken(), 
            agendum_note: prop 
        }).then(response => {
            this.props.handleNewNote(response.data);
        });
    }

    /*
     * Handle the updating of an existing note's contents.
     */
    updateNote = (prop) => {
        var url = `/meetings/${this.props.meetingID}`
            + `/agenda/${this.props.agendumID}`
            + `/notes/${this.state.note.id}`;

        axios.patch(url, {
            authenticity_token: Utils.getAuthenticityToken(),
            agendum_note: prop
        }).then(response => {
            this.setState({ note: response.data });
        });
    }

    render() {
        var isExisting = this.state.note.id;

        var noteClass = 'collection-item' + 
            (!isExisting ? ' grey-text' : '');

        return(
            <li className={noteClass}>
                <RIETextArea
                    change={isExisting ? this.updateNote : this.addNewNote}
                    value={isExisting ? this.state.note.content : 'Add a new note...'}
                    propName="content" />
            </li>
        );
    }
}