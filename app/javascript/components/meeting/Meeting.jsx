import React from 'react';

// Controls
import AgendaContainer from '../../containers/AgendaContainer';
import ActionItemsContainer from '../../containers/ActionItemsContainer';
import AttendeesContainer from '../../containers/AttendeesContainer';
import AgendumDetailsContainer from '../../containers/AgendumDetailsContainer';
import DateTimePicker from '../common/date_time_picker';
import InlineEdit from '../common/InlineEdit';

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
      <div>
        <div className="meeting-main-content">
          {/* Title */}
          <InlineEdit
            name="title"
            onChange={this.props.onFieldUpdate}
            displayElement='h4'
            value={this.props.meeting.title}
            singleClickToEdit={!this.props.meeting.id} />

          {/* Date & times */}
          <div className="row margin-bottom-none">
            <div className="col m6">
              <div className="row margin-bottom-none">
                <div className="col m1 bold">Start</div>
                <div className="col m3">
                  <DateTimePicker
                    name="start_date"
                    dateTime={startDate}
                    onChange={this.props.onFieldUpdate} />
                </div>
              </div>

              <div className="row margin-bottom-none">
                <div className="col m1 bold">End</div>
                <div className="col m3">
                  <DateTimePicker
                    name="end_date"
                    dateTime={endDate}
                    onChange={this.props.onFieldUpdate} />
                </div>
              </div>
            </div>
          </div>

          {/* Agenda */}
          <h5 className="sub-header">Agenda</h5>
          <AgendaContainer />
        </div>

        {/* Action items, Attendees, & Agendum details */}
        <div className="meeting-sidebar col m3 z-depth-3 card-panel">
          <ul className="collapsible" data-collapsible="accordion">
            <li>
              <div className="collapsible-header active">
                  <h5>Attendees</h5>
                  <hr className="print-only" />
              </div>
              <div id="attendees" className="collapsible-body">
                <AttendeesContainer />
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                  <h5>Action Items</h5>
                  <hr className="print-only" />
              </div>
              <div className="collapsible-body">
                <ActionItemsContainer />
              </div>
            </li>
            <li id="agendum-details">
              <div className="collapsible-header">
                <h5>Agendum Details</h5>
              </div>
              <div className="collapsible-body">
                  <AgendumDetailsContainer />
                </div>
            </li>
          </ul>
        </div>

        {/* FAB */}
        <div className="fixed-action-btn click-to-toggle">
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
