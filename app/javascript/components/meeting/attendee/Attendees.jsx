import React from 'react';

import Autocomplete from '../../common/autocomplete';

import Utils from 'utils';

export default class Attendees extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if (this.props.attendees.length > prevProps.attendees.length) {
            this.autocomplete.focus();
        }
    }

    autocompletePath = (autocompleteValue) => {
        return '/attendees/autocomplete?email=' + encodeURIComponent(autocompleteValue);
    }

    parseAutocompleteResponse = (data) => {
        var attendeeIDs = this.props.attendees.map(it => it.id);
        return data.filter(it => attendeeIDs.indexOf(it.id) === -1);
    }

    onAutocompleteItemSelected = (item) => {
        this.props.onAttendeeSelect(item.email, this.props.meetingID);
    }

    render() {
        return (
            <div>
                <ul className="list">
                    {this.props.attendees.map(attendee => {
                        return (
                            <li key={attendee.id}>
                                <div className="media">
                                    <img src={Utils.getGravatarUrl(attendee.email)} className="avatar" />
                                    <div className="media-text">
                                        <span>{attendee.email}</span>
                                    </div>
                                </div>
                                <button className="list-floating-content"
                                    onClick={() => {
                                        this.props.onAttendeeRemove(attendee.email, this.props.meetingID);
                                    }}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <Autocomplete
                    id="attendees-autocomplete"
                    className="autocomplete"
                    placeholder="Add Attendee"
                    method="GET"
                    url={this.autocompletePath}
                    parseResponse={this.parseAutocompleteResponse}
                    renderItem={(item) => item.email}
                    onItemSelected={this.onAutocompleteItemSelected} />
            </div>
        );
    }
};
