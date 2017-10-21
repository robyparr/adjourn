import React from 'react';

// Controls
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

// Utils
import Utils from 'utils';

const Attendees = (props) => {
    return (
        <div>
            <h5>Attendees</h5>

            <div className="print-hide">
                <AutoComplete
                    hintText="Add Attendee"
                    className="browser-default"
                    fullWidth={true}
                    dataSource={props.attendeeResults}
                    onUpdateInput={props.onInputUpdate}
                    onNewRequest={(value, index) => {
                        props.onAttendeeSelect(value, props.meetingID);
                    }}
                    searchText={props.searchText} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {props.attendees.map(attendee => {
                    return (
                        <Chip 
                            key={attendee.id}
                            style={{ margin: 4 }}
                            onRequestDelete={() => {
                                props.onAttendeeRemove(attendee.email, props.meetingID);
                            }}>
                            <Avatar src={Utils.getGravatarUrl(attendee.email)} />
                            {attendee.email}
                        </Chip>
                    )
                })}
            </div>
        </div>
    );
};

export default Attendees;