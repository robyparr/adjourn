import React, { Component } from 'react';

// Controls
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'rc-time-picker';

import ActionItems from './action_item/action_items';
import AgendumList from './agendum/agendum_list';
import Attendees from './attendee/attendees';
import DateTimePicker from '../common/date_time_picker';
import InlineEdit from '../common/inline_edit';

// Utilities
import Utils from 'utils';
import axios from 'axios';
import moment from 'moment';

// For material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/*
 * MeetingForm provides the UI for all meeting resource updates.
 */
export default class Meeting extends Component {

  constructor(props) {
    super(props);

    props.meeting.title =  props.meeting.title || 'New Meeting';
    props.meeting.start_date = props.meeting.start_date || moment().toDate();
    props.meeting.end_date = props.meeting.end_date || moment().add(1, 'hours').toDate();

    this.state = {
      authenticity_token: Utils.getAuthenticityToken(),
      meeting: props.meeting,
      agenda: props.meeting.agenda || [],
      errors: null,
      actionItems: props.meeting.action_items,
      attendees: props.meeting.attendees || []
    };
  }

  /*
   * Event handler for field updates.
   */
  handleFieldUpdate = (field, value) => {
    // Update the meeting object
    var meeting = this.state.meeting;
    meeting[field] = value;

    // Set the state with the modified meeting object and save to
    // the server.
    this.setState({ meeting: meeting }, () => this.saveMeeting());

    
    ;
  }

  /*
   * Utility event handler to convert a normal JavaScript event
   * object into the proper format for this.handleFieldUpdate();
   */
  handleNormalFieldUpdate = (e) => {
    var fieldName = e.target.name;
    var value = e.target.value;

    this.handleFieldUpdate({ fieldName: value });
  }

  /*
   * Saves the meeting.
   */
  saveMeeting = () => {
    axios({
      method: this.state.meeting.id ? 'PATCH' : 'POST',
      url: this.state.meeting.id? `/meetings/${this.state.meeting.id}` : '/meetings',
      data: this.state
    }).then(response => this.setState({ meeting: response.data, errors: null }))
    .catch(error => {
      if (error.response) {
        var errors = error.response.data;
        this.setState({ errors: errors });
      }
    });
  }

  /*
   * Handles the addition of a new adgendum.
   * This will add the new agendum to the meeting agenda,
   * causing a state update.
   */
  handleAgendumAddRemove = (agendum, isAdd) => {
    var agenda = this.state.agenda || [];

    if (isAdd) {
      agenda.push(agendum);
    } else {
      var agendumToDeleteIndex = agenda.indexOf(agendum);
      agenda.splice(agendumToDeleteIndex, 1);
    }

    this.setState({ agenda: agenda });
  }

  /*
   * Handles the addition of a new action item.
   * This will add the new action item to the meeting,
   * causing a state update.
   */
  handleActionItemAddRemove = (item, isAdd) => {
    var actionItems = this.state.actionItems || [];

    if (isAdd) {
      actionItems.push(item);
    } else {
      var itemToDeleteIndex = actionItems.indexOf(item);
      actionItems.splice(itemToDeleteIndex, 1);
    }

    this.setState({ actionItems: actionItems });
  }

    /*
   * Handles the addition of a new attendee.
   * This will add the new attendee to the meeting,
   * causing a state update.
   */
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
  }

  render() {
    /*
     * HTML and styles
     */
    var errorsHTML = this.state.errors ? (
      <div className="col m6 error text-right">
        <h5>Oops! We've got a problem!</h5>
        <ul>
          { 
            this.state.errors.map((e, key) => {
              return <li key={key}>{e}</li>
            }) 
          }
        </ul>
      </div>
    ) : "";

    /*
     * Values
     */
    var start_date = moment(this.state.meeting.start_date).utc().local();
    var end_date = moment(this.state.meeting.end_date).utc().local();

    return (
      <div>
        {/* Title */}
        <div className="row">
          <div className="col m9">
            <InlineEdit
              name="title"
              onChange={this.handleFieldUpdate}
              displayElement='h4'
              value={this.state.meeting.title} />
              {errorsHTML}
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
                  dateTime={start_date}
                  onChange={this.handleFieldUpdate} />
              </div>
            </div>
            <div className="row">
              <div className="col m1 bold">End</div>
              <div className="col m3">
                <DateTimePicker 
                  name="end_date"
                  dateTime={end_date}
                  onChange={this.handleFieldUpdate} />
              </div>
            </div>
          </div>

          {/* Attendees */}
          {this.state.meeting.id &&
            <div className="col m5">
              <Attendees
                attendees={this.state.attendees}
                handleAttendeesAddRemove={this.handleAttendeesAddRemove}
                meetingID={this.state.meeting.id} />
            </div>
          }
        </div>

        <div className="row">
          {/* Action items */}
          {this.state.meeting.id &&
            <div className="action-items col m3 z-depth-3 card-panel">
              <div className={this.state.actionItems.length === 0 ? "print-hide" : ""}>
                <ActionItems
                  actionItems={this.state.actionItems} 
                  meetingID={this.state.meeting.id}
                  handleActionItemAddRemove={this.handleActionItemAddRemove} />
              </div>
            </div>
          }

          {/* Agenda */}
          {this.state.meeting.id &&
            <div className="col m9">
              <div>
                <h5>Agenda</h5>
                <hr />
                <AgendumList 
                  agenda={this.state.agenda} 
                  meetingID={this.state.meeting.id}
                  handleAgendumAddRemove={this.handleAgendumAddRemove} />
              </div>
            </div>
          }

          {/* FAB */}
          {this.state.meeting.id &&
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
}
