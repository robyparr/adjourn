import React from 'react';

// Controls
import AgendaContainer from '../../containers/AgendaContainer';
import MeetingSidebar from './MeetingSidebar';
import InlineEdit from '../common/InlineEdit';
import EventTimePicker from '../common/EventTimePicker';

// Utilities
import moment from 'moment';

/*
 * MeetingForm provides the UI for all meeting resource updates.
 */
export default class Meeting extends React.Component {

  render() {
    /*
    * Convert dates to local time.
    */
    const startDate = moment(this.props.meeting.start_date).utc().local();
    const endDate = moment(this.props.meeting.end_date).utc().local();

    return (
      <div className="row">
        <div className="column lg9 lg:pr-6">
          {/* Title */}
          <InlineEdit
            name="title"
            onChange={this.props.onFieldUpdate}
            displayElement='h3'
            className="mb-1"
            value={this.props.meeting.title}
            singleClickToEdit={!this.props.meeting.id} />

          {/* Date and times */}
          <EventTimePicker />

          <div className="button primary mt-4"
            onClick={this.props.onEmailAttendeesClick}>Email Attendees</div>

          {/* Agenda */}
          <h4 className="mt-8">Agenda</h4>
          <AgendaContainer />
        </div>

        {/* Sidebar: Action items, Attendees, & Agendum details */}
        <MeetingSidebar />
      </div>
    );
  }
}
