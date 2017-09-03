import React, { Component } from 'react';

// Controls
import AutoComplete from 'material-ui/AutoComplete';

// Utils
import axios from 'axios';
import Utils from 'utils';

export default class Attendees extends Component {

    constructor(props) {
        super(props);

        this.state = {
            attendees: props.attendees || [],
            attendeeResults: props.attendeeResults || [],
            searchText: ""
        };

        console.log(this.state);
    }

    handleUpdateInput = (value) => {
        this.setState({ searchText: value });

        if (value.length < 3) return;

        axios({
            method: 'GET',
            url: '/attendees/autocomplete',
            data: { email: value }
        }).then(response => {
            var results = response.data
                .filter(it => this.state.attendees.indexOf(it) >= 0)
                .map(it => it.email);

            this.setState({ attendeeResults: results });
        });
    }

    handleResultSelected = (value, index) => {
        axios({
            method: 'POST',
            url: `/meetings/${this.props.meetingID}/attendees/attend`,
            data: { email: value, authenticity_token: Utils.getAuthenticityToken() }
        }).then(response => {
            this.props.handleAttendeesAddRemove(response.data, true);
            this.setState({ searchText: "" });
        });
    }

    render() {
        return (
            <div>
                <h5>Attendees</h5>
                <AutoComplete
                    hintText="Add Attendee"
                    className="browser-default"
                    dataSource={this.state.attendeeResults}
                    onUpdateInput={this.handleUpdateInput}
                    onNewRequest={this.handleResultSelected}
                    searchText={this.state.searchText} />

                    <ul>
                {this.state.attendees.map(attendee => {
                    return <li key={attendee.id}>{attendee.email}</li>
                })}
                </ul>
            </div>
        );
    }
}