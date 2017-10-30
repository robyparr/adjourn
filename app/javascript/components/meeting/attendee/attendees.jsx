import React from 'react';

// Controls
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

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
        return (
            <div>
                <h5>Attendees</h5>

                <div className="print-hide">
                    <AutoComplete
                        hintText="Add Attendee"
                        className="browser-default"
                        fullWidth={true}
                        dataSource={this.props.attendeeResults}
                        onUpdateInput={this.props.onInputUpdate}
                        onNewRequest={this.onNewrequest}
                        searchText={this.props.searchText}
                        ref={input => this.autoComplete = input} />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {this.props.attendees.map(attendee => {
                        return (
                            <Chip
                                key={attendee.id}
                                style={{ margin: 4 }}
                                onRequestDelete={() => {
                                    this.props.onAttendeeRemove(attendee.email, this.props.meetingID);
                                }}>
                                <Avatar src={Utils.getGravatarUrl(attendee.email)} />
                                {attendee.email}
                            </Chip>
                        )
                    })}
                </div>
            </div>
        );
    }
};
