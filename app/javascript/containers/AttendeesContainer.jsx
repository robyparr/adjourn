import React from 'react';
import { connect } from 'react-redux';

import Attendees from '../components/meeting/attendee/Attendees';
import { addAttendee, removeAttendee } from '../actions/attendees';

export class AttendeesContainer extends React.Component {
  onAttendeeAdded = (email, meetingID) => {
    this.props.addAttendee(email, meetingID);
    this.setState({ searchText: "" });
  }

  render() {
    return (
      <Attendees
        attendees={this.props.attendees}
        meetingID={this.props.meetingID}
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
