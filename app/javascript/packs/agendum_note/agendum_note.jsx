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
    BASE_URL = `/meetings/${this.props.meetingID}`
            + `/agenda/${this.props.agendumID}`
            + `/notes/`;

    constructor(props) {
        super(props);
        this.state = { note: props.note };
    }

    /*
     * Handle adding a new note to the agendum.
     */
    addNewNote = (prop) => {
        // Create the new note
        axios.post(this.BASE_URL, { 
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
        axios.patch(this.BASE_URL + this.state.note.id, {
            authenticity_token: Utils.getAuthenticityToken(),
            agendum_note: prop
        }).then(response => {
            this.setState({ note: response.data });
        });
    }

    /*
     * Handle the deletion of a note.
     */
    deleteNote = (e) => {
        e.preventDefault();

        axios.delete(this.BASE_URL + this.state.note.id, {
            params: { authenticity_token: Utils.getAuthenticityToken() }
        }).then(response => {
            this.props.handleDeletedNote(this.state.note);
        });
    }

    render() {
        var isExisting = this.state.note.id;

        var noteClass = 'agendum-note collection-item' + 
            (!isExisting ? ' grey-text' : '');

        // Dialog settings
        var deleteDialogActions = [
            <FlatButton label="Yes" primary={true} onTouchTap={this.deleteNote} />,
            <FlatButton label="No" primary={true} onTouchTap={() => this.setState({ delete: false })} />
        ];

        var deleteDialog = this.state.delete ? 
                <Dialog
                    actions={deleteDialogActions}
                    modal={false}
                    open={this.state.delete}>
                        Are you sure you want to remove this note?
                </Dialog>
                : "";

        return(
            <li className={noteClass}>
                {isExisting &&
                    <a className="secondary-content delete-link" onClick={() => this.setState({ delete: true })}>
                        <i className="material-icons">delete</i>
                    </a>
                }

                <RIETextArea
                    change={isExisting ? this.updateNote : this.addNewNote}
                    value={isExisting ? this.state.note.content : 'Add a new note...'}
                    propName="content" />

                {deleteDialog}
            </li>
        );
    }
}