import React from 'react';
import { connect } from 'react-redux';

import Meeting from '../components/meeting/Meeting';
import { updateMeeting } from '../actions/meetings';

// Utils
import axios from 'axios';
import Utils from 'utils';

const MeetingContainer = ({ meeting, updateMeeting }) => {

  const onFieldsUpdate = (fields) => {
    const meetingUpdate = Object.assign({}, meeting, fields);
    updateMeeting(meetingUpdate);
  };

  const onEmailAttendeesClick = () => {
    axios({
      method: 'POST',
      url: `/meetings/${meeting.id}/email_attendees`,
      data: { authenticity_token: Utils.getAuthenticityToken() }
    })
    .then(response => {
      showInformationMessage(response.data.message);
    })
    .catch(error => {
      showErrorMessage(error.response.data.error);
    });
  }

  return (
    <Meeting
      meeting={meeting}
      onFieldsUpdate={onFieldsUpdate}
      onEmailAttendeesClick={onEmailAttendeesClick} />
  );
};

const mapStateToProps = state => {
  return {
    meeting: state.meeting
  }
};

export default connect(
  mapStateToProps,
  { updateMeeting }
)(MeetingContainer);
