import React, { Component } from 'react';

// Controls
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

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
    }

    handleUpdateInput = (value) => {
        this.setState({ searchText: value });

        if (value.length < 3) return;

        axios({
            method: 'GET',
            url: '/attendees/autocomplete',
            type: 'application/json',
            data: { email: value }
        }).then(response => {
            var attendeeIDs = this.state.attendees.map(it => it.id);

            var results = response.data
                .filter(it => attendeeIDs.indexOf(it.id) === -1)
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

    handleAttendeeRemoved = (attendee) => {
        axios({
            method: 'DELETE',
            url: `/meetings/${this.props.meetingID}/attendees`,
            data: { email: attendee.email, authenticity_token: Utils.getAuthenticityToken() }
        }).then((response) => {
            this.props.handleAttendeesAddRemove(attendee);
        });
    }

    render() {
        $('.chips-autocomplete input').on('keyup', () => this.handleUpdateInput);

        return (
            <div>
                <h5>Attendees</h5>

                <div className="print-hide">
                    <AutoComplete
                        hintText="Add Attendee"
                        className="browser-default"
                        fullWidth={true}
                        dataSource={this.state.attendeeResults}
                        onUpdateInput={this.handleUpdateInput}
                        onNewRequest={this.handleResultSelected}
                        searchText={this.state.searchText} />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {this.state.attendees.map(attendee => {
                        return (
                            <Chip 
                                key={attendee.id}
                                style={{ margin: 4 }}
                                onRequestDelete={() => this.handleAttendeeRemoved(attendee)}>
                                <Avatar src={Utils.getGravatarUrl(attendee.email)} />
                                {attendee.email}
                            </Chip>
                        )
                    })}
                </div>
            </div>
        );
    }
}