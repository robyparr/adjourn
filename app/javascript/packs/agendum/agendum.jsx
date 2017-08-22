import React, { Component } from 'react';

// Controls
import Dialog  from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import AgendumNoteList from '../agendum_note/agendum_note_list';
import InlineEdit from '../common/inline_edit';

// Utils
import axios from 'axios';
import Utils from 'utils';

/*
 * A single Agendum.
 */
export default class Agendum extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    /*
     * The initial component state.
     */
    getInitialState = () => {
        return {
            isExisting: this.props.agendum != null,
            agendum: this.props.agendum || {},
            isEditing: false
        }
    }

    /*
     * Handle updating of the attribute of a the agendum.
     */
    handleUpdate = (field, value) => {
        var meetingID = this.props.meetingID;
        var agendumID = this.state.agendum.id;
        var url = `/meetings/${meetingID}/agenda/`;

        var agendum = {};
        agendum[field] = value;

        axios({
            url: agendumID ? url + agendumID : url,
            method: agendumID ? 'PATCH' : 'POST',
            data: { authenticity_token: Utils.getAuthenticityToken(), agendum: agendum }
        }).then(response => {
            if (agendumID) {
                this.setState({ agendum: response.data });
            } else {
                this.setState(this.getInitialState());
                this.props.handleAgendumAddRemove(response.data, true);
            }
        }).catch(error => console.log(error));
    }

    /*
     * Delete the agendum.
     */
    handleDeleteAgendum = () => {
        axios({
            url: `/meetings/${this.props.meetingID}/agenda/${this.state.agendum.id}`,
            method: 'delete',
            data: { authenticity_token: Utils.getAuthenticityToken() }
        }).then(response => {
            this.setState({ delete: false });
            this.props.handleAgendumAddRemove(this.state.agendum, false);
        });
    }

    handleEditModeChanged = (isEditMode) => {
        this.setState({ isEditing: isEditMode });
    }

    render() {
        // Is this agendum an existing item or a new form?
        var isExisting = this.state.isExisting;

        // The card's CSS class
        var cardClass = `card ${!isExisting ? "grey lighten-4" : ""}`;

        // The prefix for element IDs
        var idPrefix = isExisting ? this.state.agendum.id : 'new';

        // The title value
        var titleValue = this.state.agendum.title ? 
            this.state.agendum.title
            : "New Agendum";

        // The description value
        var descriptionValue = this.state.agendum.description ?
            this.state.agendum.description
            : "Click here to add a description.";


        var deleteDialogActions = [
            <FlatButton label="Yes" primary={true} onTouchTap={this.handleDeleteAgendum} />,
            <FlatButton label="No" primary={true} onTouchTap={() => this.setState({ delete: false })} />
        ];

        var deleteDialog = this.state.delete ? 
                <Dialog
                    actions={deleteDialogActions}
                    modal={false}
                    open={this.state.delete}>
                        Are you sure you want to remove this agendum?
                </Dialog>
                : "";

        return(
            <div className={cardClass} onClick={this.handleNewItemClick}>
                <div className="card-content">
                    {isExisting && !this.state.isEditing &&
                        <div className="right">
                            <a className="delete-link" onClick={() => this.setState({ delete: true })}>
                                <i className="material-icons">delete</i>
                            </a>
                        </div>
                    }
                    <span className="card-title" id={`${idPrefix}_title`}>
                        <InlineEdit
                            onChange={this.handleUpdate}
                            onEditModeChanged={this.handleEditModeChanged}
                            value={titleValue}
                            name="title" />
                    </span>
                    {isExisting &&
                        <InlineEdit
                            onChange={this.handleUpdate}
                            value={descriptionValue}
                            onEditModeChanged={this.handleEditModeChanged}
                            name="description"
                            multilineEditor={true}
                            renderMarkdown={true} />
                    }
                </div>

                {isExisting &&
                    <div className="card-actions">
                        <AgendumNoteList 
                            meetingID={this.props.meetingID}
                            agendumID={this.state.agendum.id}
                            notes={this.state.agendum.notes} />
                    </div>
                }

                {deleteDialog}
            </div>
        );
    }
}