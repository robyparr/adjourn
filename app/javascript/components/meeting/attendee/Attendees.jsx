import React from 'react';

// Utils
import Utils from 'utils';

export default class Attendees extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if (this.props.attendees.length > prevProps.attendees.length) {
            this.autocomplete.focus();
        }
    }

    componentDidMount() {
        AdjournAutocomplete.init('#attendees-autocomplete', {
            method: 'GET',
            url: function(autocomplete) {
                return '/attendees/autocomplete?email=' + encodeURIComponent(autocomplete);
            },
            parseResponse: (data) => {
                var attendeeIDs = this.props.attendees.map(it => it.id);

                return data.filter(it => attendeeIDs.indexOf(it.id) === -1);
            },
            renderItem: (item) => item.email,
            onItemSelected: (item) => {
                this.props.onAttendeeSelect(item.email, this.props.meetingID);
            }
          });
    }

    render() {
        const containerClass = "collection with-header margin-top-none "
            + (this.props.attendees.length === 0 ? "print-hide" : "");

        return (
            <ul className={containerClass}>
                {this.props.attendees.map(attendee => {
                    return (
                        <li key={attendee.id}
                            className="collection-item avatar">
                            <a className="secondary-content delete-link"
                                onClick={() => {
                                    this.props.onAttendeeRemove(attendee.email, this.props.meetingID);
                                }}>
                                <i className="material-icons">delete</i>
                            </a>
                            <img src={Utils.getGravatarUrl(attendee.email)} className="circle" />
                            <span>{attendee.email}</span>
                        </li>
                    );
                })}
                <li className="collection-item checkbox grey lighten-4 print-hide">
                    <input type="text"
                        id="attendees-autocomplete"
                        className="adjourn-autocomplete"
                        placeholder="Add Attendee"
                        ref="autocomplete" />
                </li>
            </ul>
        );
    }
};
