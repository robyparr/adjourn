import React, { Component } from 'react';

// Controls
import InlineEdit from '../common/inline_edit';
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
        this.state = { 
            note: props.note,
            isEditing: false
        };
    }

    /*
     * Handle adding a new note to the agendum.
     */
    addNewNote = (field, value) => {
        var note = {};
        note[field] = value;

        // Create the new note
        axios.post(this.BASE_URL, { 
            authenticity_token: Utils.getAuthenticityToken(), 
            agendum_note: note 
        }).then(response => {
            this.props.handleNewNote(response.data);
        });
    }

    /*
     * Handle the updating of an existing note's contents.
     */
    updateNote = (field, value) => {
        var note = {};
        note[field] = value;

        axios.patch(this.BASE_URL + this.state.note.id, {
            authenticity_token: Utils.getAuthenticityToken(),
            agendum_note: note
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

    handleNoteEditModeChanged = (isEditMode) => {
        this.setState({ isEditing: isEditMode});
    }

    render() {
        var isExisting = this.state.note.id;

        var noteClass = 'agendum-note collection-item grey lighten-4' + 
            (!isExisting ? ' grey-text print-hide' : '');

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
                {isExisting && !this.state.isEditing &&
                    <a className="secondary-content delete-link" onClick={() => this.setState({ delete: true })}>
                        <i className="material-icons">delete</i>
                    </a>
                }

                <InlineEdit
                    onChange={isExisting ? this.updateNote : this.addNewNote}
                    onEditModeChanged={this.handleNoteEditModeChanged}
                    value={isExisting ? this.state.note.content : 'Add a new note...'}
                    name="content"
                    className={noteClass}
                    multilineEditor={true}
                    renderMarkdown={true} />

                {deleteDialog}
            </li>
        );
    }
}