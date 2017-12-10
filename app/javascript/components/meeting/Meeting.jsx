import React, { Component } from 'react';

// Controls
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'rc-time-picker';

import AgendaContainer from '../../containers/AgendaContainer';
import ActionItemsContainer from '../../containers/ActionItemsContainer';
import AttendeesContainer from '../../containers/AttendeesContainer';
import AgendumDetailsContainer from '../../containers/AgendumDetailsContainer';
import Attendees from './attendee/Attendees';
import DateTimePicker from '../common/date_time_picker';
import InlineEdit from '../common/InlineEdit';

// Utilities
import Utils from 'utils';
import axios from 'axios';
import moment from 'moment';

/*
 * MeetingForm provides the UI for all meeting resource updates.
 */
export default class Meeting extends React.Component {

  componentDidUpdate() {
    // Make sure that global JavaScript is initialized after the
    // meeting component updates. This is especially important
    // for when a new meeting is created and some previously
    // missing components (e.g. the sidebar which relies on
    // MaterializeCSS's collapsible script) are displayed.
    // ready() is the function defined in 
    // app/assets/javascripts/meetings.js
    ready();
  }

  render() {
    /*
    * Convert dates to local time.
    */
    var startDate = moment(this.props.meeting.start_date).utc().local();
    var endDate = moment(this.props.meeting.end_date).utc().local();
    return (
      <div>
        {/* Title */}
        <div className="row">
          <div className="col m9">
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
          <div className="col m4">
            <div className="row">
              <div className="col m1 bold">Start</div>
              <div className="col m3">
                <DateTimePicker
                  name="start_date"
                  dateTime={startDate}
                  onChange={this.props.onFieldUpdate} />
              </div>
            </div>

            <div className="row">
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

        <div className="row">
          {/* Action items & Attendees */}
          {this.props.isExistingMeeting &&
            <div className="sidebar col m3 z-depth-3 card-panel">
              <ul className="collapsible" data-collapsible="accordion">
                <li>
                  <div className="collapsible-header active">
                      <h5>Attendees</h5>
                      <hr className="print-only" />
                  </div>
                  <div className="collapsible-body">
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
                <li>
                  <div className="collapsible-header">
                    <h5>Agendum Details</h5>
                  </div>
                  <div className="collapsible-body">
                      <AgendumDetailsContainer />
                    </div>
                </li>
              </ul>
            </div>
          }

          {/* Agenda */}
          {this.props.isExistingMeeting &&
            <div className="col m9">
              <div>
                <h5>Agenda</h5>
                <hr />
                <AgendaContainer />
              </div>
            </div>
          }

          {/* FAB */}
          {this.props.isExistingMeeting &&
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
          }
        </div>
      </div>
    );
  }
}
