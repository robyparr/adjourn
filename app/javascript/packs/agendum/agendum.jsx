import React, { Component } from 'react';

// Controls
import { RIEInput, RIETextArea } from 'riek';

// Utils
import axios from 'axios';
import Utils from 'utils';

/*
 * A single Agendum.
 */
export default class Agendum extends Component {
    constructor(props) {
        super(props);
        this.state = { agendum: props.agendum };
    }

    /*
     * Handle updating of the attribute of a the agendum.
     */
    handleUpdate = (prop) => {
        var meetingID = this.state.agendum.meeting_id;
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
        })
    }

    render() {
        return(
            <div className="card blue-grey lighten-1">
                <div className="card-content white-text">
                    <span className="card-title">
                        <RIEInput
                            change={this.handleUpdate}
                            value={this.state.agendum.title}
                            propName="title" />
                    </span>
                    <p>
                        <RIETextArea
                            change={this.handleUpdate}
                            value={this.state.agendum.description}
                            propName="description" />
                    </p>
                </div>
            </div>
        );
    }
}