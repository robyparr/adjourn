import React, { Component } from 'react';

// Controls
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'rc-time-picker';

import AgendaContainer from '../../containers/AgendaContainer';
import ActionItemsContainer from '../../containers/ActionItemsContainer';
import AttendeesContainer from '../../containers/AttendeesContainer';
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
const Meeting = props => {
  /*
   * Convert dates to local time.
   */
  var startDate = moment(props.meeting.start_date).utc().local();
  var endDate = moment(props.meeting.end_date).utc().local();
  return (
    <div>
      {/* Title */}
      <div className="row">
        <div className="col m9">
          <InlineEdit
            name="title"
            onChange={props.onFieldUpdate}
            displayElement='h4'
            value={props.meeting.title} />
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
                onChange={props.onFieldUpdate} />
            </div>
          </div>

          <div className="row">
            <div className="col m1 bold">End</div>
            <div className="col m3">
              <DateTimePicker 
                name="end_date"
                dateTime={endDate}
                onChange={props.onFieldUpdate} />
            </div>
          </div>
        </div>

        {/* Attendees */}
        {props.isExistingMeeting &&
          <div className="col m5">
            <AttendeesContainer />
          </div>
        }
      </div>

      <div className="row">
        {/* Action items */}
        {props.isExistingMeeting &&
          <div className="action-items col m3 z-depth-3 card-panel">
            <ActionItemsContainer />
          </div>
        }

        {/* Agenda */}
        {props.isExistingMeeting &&
          <div className="col m9">
            <div>
              <h5>Agenda</h5>
              <hr />
              <AgendaContainer />
            </div>
          </div>
        } 

        {/* FAB */}
        {props.isExistingMeeting &&
          <div className="fixed-action-btn click-to-toggle">
            <a className="btn-floating btn-large red">
              <i className="material-icons">menu</i>
            </a>
            <ul>
              <li>
                <a className="btn-floating red tooltipped" 
                  data-position="left"
                  data-delay="50"
                  onClick={props.onEmailAttendeesClick}
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

export default Meeting;
