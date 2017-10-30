import React from 'react';
import { connect } from 'react-redux';

import Attendees from '../components/meeting/attendee/Attendees';
import { addAttendee, removeAttendee } from '../actions/attendees';

import axios from 'axios';

export class AttendeesContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attendeeResults: props.attendeeResults || [],
            searchText: ""
        };
    }

    onInputUpdate = (value) => {
        this.setState({ searchText: value });

        axios({
            method: 'GET',
            url: '/attendees/autocomplete',
            type: 'application/json',
            data: { email: value }
        }).then(response => {
            var attendeeIDs = this.props.attendees.map(it => it.id);

            var results = response.data
                .filter(it => attendeeIDs.indexOf(it.id) === -1)
                .map(it => it.email);

            this.setState({ attendeeResults: results });
        });
    }

    onAttendeeAdded = (email, meetingID) => {
        this.props.addAttendee(email, meetingID);
        this.setState({ searchText: "" });
    }

    render() {
        return (
            <Attendees
                attendees={this.props.attendees}
                attendeeResults={this.state.attendeeResults}
                searchText={this.state.searchText}
                meetingID={this.props.meetingID}
                onInputUpdate={this.onInputUpdate}
                onAttendeeSelect={this.onAttendeeAdded}
                onAttendeeRemove={this.props.removeAttendee} />
        );
    }
};

const mapStateToProps = state => {
    return {
        attendees: state.attendees,
        meetingID: state.meeting.id
    }
};

export default connect(
    mapStateToProps,
    { addAttendee, removeAttendee }
)(AttendeesContainer);