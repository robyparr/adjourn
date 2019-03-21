import React from 'react';

// Controls
import AgendaContainer from '../../containers/AgendaContainer';
import MeetingSidebar from './MeetingSidebar';
import InlineEdit from '../common/InlineEdit';
import EventTimePicker from '../common/EventTimePicker';

/*
 * MeetingForm provides the UI for all meeting resource updates.
 */
export default class Meeting extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="column lg9 lg:pr-6">
          {/* Title */}
          <InlineEdit
            name="title"
            onChange={(field, value) => this.props.onFieldsUpdate({ [field]: value} )}
            displayElement='h3'
            className="mb-1"
            value={this.props.meeting.title}
            singleClickToEdit={!this.props.meeting.id} />

          {/* Date and times */}
          <EventTimePicker
            from={this.props.meeting.start_date}
            to={this.props.meeting.end_date}
            onChange={this.props.onFieldsUpdate} />

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
