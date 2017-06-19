import React, { Component } from 'react';

// Controls
import { RIEInput, RIETextArea } from 'riek';
import Dialog  from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
            agendum: this.props.agendum || {}
        }
    }

    /*
     * Handle updating of the attribute of a the agendum.
     */
    handleUpdate = (prop) => {
        var meetingID = this.props.meetingID;
        var agendumID = this.state.agendum.id;

        axios.patch(
            `/meetings/${meetingID}/agenda/${agendumID}`,
            { authenticity_token: Utils.getAuthenticityToken(), agendum: prop }
        ).then(responese => {
            console.log(responese);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            console.log(error.response.data);
        });
    }

    /*
     * Handles the change of a new agendum component's
     * elements, casuing the new value to be saved into
     * component state.
     */
    handleChange = (prop) => {
        var agendum = this.state.agendum;

        var propName = Object.keys(prop)[0];
        agendum[propName] = prop[propName];

        this.setState({ agendum: agendum });
    }

    /*
     * Save the new agendum.
     */
    handleSaveAgendum = (e) => {
        e.preventDefault();

        axios.post(
            `/meetings/${this.props.meetingID}/agenda`,
            { authenticity_token: Utils.getAuthenticityToken(), agendum: this.state.agendum }
        ).then(response => {
            this.setState(this.getInitialState());
            this.props.handleAgendumAddRemove(response.data, true);
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            console.log(error.response.data);
        });
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

    render() {
        // Is this agendum an existing item or a new form?
        var isExisting = this.state.isExisting;

        // The card's CSS class
        var cardClass = `agendum card blue-grey ${isExisting ? "lighten-1" : "lighten-3"}`;

        // The prefix for element IDs
        var idPrefix = isExisting ? this.state.agendum.id : 'new';

        // The card's FAB.
        var cardFAB = !isExisting && this.state.agendum.title ?
            <a className="btn-floating btn-large halfway-fab waves-effect waves-light red"
                onClick={this.handleSaveAgendum}>
                <i className="material-icons">done</i>
              </a>
            : "";

        // The title value
        var titleValue = this.state.agendum.title ? 
            this.state.agendum.title
            : "New Agendum";

        // The description value
        var descriptionValue = this.state.agendum.description ?
            this.state.agendum.description
            : "Click here to add a new agendum!";


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
                <div className="card-content white-text">
                    <div className="right">
                        {isExisting && 
                            <a className="delete-link" onClick={() => this.setState({ delete: true })}>
                                <i className="material-icons">delete</i>
                            </a>
                        }
                    </div>
                    <span className="card-title" id={`${idPrefix}_title`}>
                        <RIEInput
                            change={isExisting ? this.handleUpdate : this.handleChange}
                            value={titleValue}
                            propName="title" />
                    </span>
                    {cardFAB}
                    <p>
                        <RIETextArea
                            change={isExisting ? this.handleUpdate : this.handleChange}
                            value={descriptionValue}
                            propName="description" />
                    </p>
                </div>

                {deleteDialog}
            </div>
        );
    }
}