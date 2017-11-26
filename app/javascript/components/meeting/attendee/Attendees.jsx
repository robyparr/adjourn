import React from 'react';

// Controls
import AutoComplete from 'material-ui/AutoComplete';

// Utils
import Utils from 'utils';

export default class Attendees extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if (this.props.attendees.length > prevProps.attendees.length) {
            this.autoComplete.focus();
        }
    }

    onNewrequest = (value, index) => {
        this.props.onAttendeeSelect(value, this.props.meetingID);
    }

    render() {
        const containerClass = "collection with-header margin-top-none "
            + (this.props.attendees.length === 0 ? "print-hide" : "");

        return (
            <ul className={containerClass}>
                <li className="collection-header">
                    <h5>Attendees</h5>
                    <hr className="print-only" />
                </li>

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
                    <AutoComplete
                        hintText="Add Attendee"
                        className="browser-default"
                        fullWidth={true}
                        dataSource={this.props.attendeeResults}
                        onUpdateInput={this.props.onInputUpdate}
                        onNewRequest={this.onNewrequest}
                        searchText={this.props.searchText}
                        ref={input => this.autoComplete = input} />
                </li>
            </ul>
        );
    }
};
