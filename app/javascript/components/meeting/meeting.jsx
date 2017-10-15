import React, { Component } from 'react';

// Controls
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'rc-time-picker';


import AgendaContainer from '../../containers/AgendaContainer';
import ActionItemContainer from '../../containers/ActionItemContainer';
import AttendeeContainer from '../../containers/AttendeeContainer';
import Attendees from './attendee/attendees';
import DateTimePicker from '../common/date_time_picker';
import InlineEdit from '../common/inline_edit';

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
  var startDate = moment(props.startDate).utc().local();
  var endDate = moment(props.endDate).utc().local();

  return (
    <div>
      {/* Title */}
      <div className="row">
        <div className="col m9">
          <InlineEdit
            name="title"
            onChange={props.onFieldUpdate}
            displayElement='h4'
            value={props.title} />
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
        {props.id &&
          <div className="col m5">
            <AttendeeContainer />
          </div>
        }
      </div>

      <div className="row">
        {/* Action items */}
        {props.id &&
          <div className="action-items col m3 z-depth-3 card-panel">
            <ActionItemContainer />
          </div>
        }

        {/* Agenda */}
        {props.id &&
          <div className="col m9">
            <div>
              <h5>Agenda</h5>
              <hr />
              <AgendaContainer />
            </div>
          </div>
        } 

        {/* FAB */}
        {props.id &&
          <div className="fixed-action-btn click-to-toggle">
            <a className="btn-floating btn-large red">
              <i className="material-icons">menu</i>
            </a>
            <ul>
              <li>
                <a className="btn-floating red tooltipped" 
                  data-position="left"
                  data-delay="50"
                  onClick={this.handleEmailAttendeesClick}
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

  /*
   * Handles the addition of a new adgendum.
   * This will add the new agendum to the meeting agenda,
   * causing a state update.
   
  handleAgendumAddRemove = (agendum, isAdd) => {
    var agenda = this.state.agenda || [];

    if (isAdd) {
      agenda.push(agendum);
    } else {
      var agendumToDeleteIndex = agenda.indexOf(agendum);
      agenda.splice(agendumToDeleteIndex, 1);
    }

    this.setState({ agenda: agenda });
  }*/

  /*
   * Handles the addition of a new action item.
   * This will add the new action item to the meeting,
   * causing a state update.
   
  handleActionItemAddRemove = (item, isAdd) => {
    var actionItems = this.state.actionItems || [];

    if (isAdd) {
      actionItems.push(item);
    } else {
      var itemToDeleteIndex = actionItems.indexOf(item);
      actionItems.splice(itemToDeleteIndex, 1);
    }

    this.setState({ actionItems: actionItems });
  }*/

    /*
   * Handles the addition of a new attendee.
   * This will add the new attendee to the meeting,
   * causing a state update.
   
  handleAttendeesAddRemove = (attendee, isAdd) => {
    var attendees = this.state.attendees || [];

    if (isAdd) {
      attendees.push(attendee);
    } else {
      var itemToDeleteIndex = attendees.indexOf(attendee);
      attendees.splice(itemToDeleteIndex, 1);
    }

    this.setState({ attendees: attendees });
  }

  handleEmailAttendeesClick = () => {
    axios({
      method: 'POST',
      url: `/meetings/${this.state.meeting.id}/email_attendees`,
      data: { authenticity_token: Utils.getAuthenticityToken() }
    }).then(response => {
      showInformationMessage(response.data.message);
    });
  }*/