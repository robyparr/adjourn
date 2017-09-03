import React, { Component } from 'react';

import AutoComplete from 'material-ui/AutoComplete';

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
        this.setState({ 
            attendeeResults: [ 'fake@example.com', 'fake2@example.com' ],
            searchText: value
        });
    }

    handleResultSelected = (value, index) => {
        this.props.handleAttendeesAddRemove(value, true);
        this.setState({ searchText: "" })
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
                    return <li key={attendee}>{attendee}</li>
                })}
                </ul>
            </div>
        );
    }
}