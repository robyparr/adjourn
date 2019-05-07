import React from 'react';

import Autocomplete from '../../common/Autocomplete';

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

  onAutocompleteEmptySubmit = (autocompleteText) => {
    this.props.onAttendeeSelect(autocompleteText, this.props.meetingID);
  }

  noAttendeesFoundMessage = (autocompleteText) => {
    return `No attendees found. Hit 'Enter' or click here to add '${autocompleteText}.'`
  }

  render() {
    return (
      <div>
        <Autocomplete
          id="attendees-autocomplete"
          className="autocomplete bg-white flex-no-shrink"
          placeholder="Add Attendee"
          method="GET"
          url={this.autocompletePath}
          parseResponse={this.parseAutocompleteResponse}
          renderItem={(item) => item.email}
          onItemSelected={this.onAutocompleteItemSelected}
          onEmptySubmit={this.onAutocompleteEmptySubmit}
          noResultsMessage={this.noAttendeesFoundMessage} />

        <ul className="list mt-4 attendees-list">
          {this.props.attendees.map(attendee => {
            return (
              <li className="list-item" key={attendee.id}>
                <div className="media">
                  <img src={Utils.getGravatarUrl(attendee.email)} className="avatar" />
                  <div className="media-text">
                    <span className="truncate">
                      {attendee.email.slice(0, 25)}
                      {attendee.email.length > 25 && "..."}
                    </span>
                  </div>
                </div>
                <button className="list-floating-content"
                    onClick={() => this.props.onAttendeeRemove(attendee.email, this.props.meetingID)}>
                  <i className="fa fa-trash"></i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};
