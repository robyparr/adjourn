import React from 'react';

// Controls
import AgendaContainer from '../../containers/AgendaContainer';
import MeetingSidebar from './MeetingSidebar';
import DateTimePicker from '../common/date_time_picker';
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
          <div className="row">
            <div className="column sm12">
              <InlineEdit
                name="title"
                onChange={this.props.onFieldUpdate}
                displayElement='h4'
                value={this.props.meeting.title}
                singleClickToEdit={!this.props.meeting.id} />
            </div>
          </div>

          {/* Date & times */}
          <div className="row">
            <div className="column sm12 bold">
              <EventTimePicker />
            </div>
          </div>

          {/* Agenda */}
          <h5 className="sub-header">Agenda</h5>
          <AgendaContainer />
        </div>

        {/* Sidebar: Action items, Attendees, & Agendum details */}
        <MeetingSidebar />

        {/* FAB */}
        <div className="fixed-action-btn click-to-toggle mb-10 lg:mb-0 z-10">
          <a className="btn-floating btn-large red">
            <i className="material-icons">menu</i>
          </a>
          <ul>
            <li>
              <a className="btn-floating red tooltipped"
                data-position="left"
                data-delay="50"
                onClick={this.props.onEmailAttendeesClick}
                data-tooltip="Email Attendees">
                <i className="material-icons">send</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
