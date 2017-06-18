import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Controls
import { RIEInput } from 'riek';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import AgendumList from './agendum/agendum_list';

// Utilities
import Utils from 'utils';
import axios from 'axios';

// For material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/*
 * MeetingForm provides the UI for all meeting resource updates.
 */
class MeetingForm extends Component {

  constructor(props) {
    super(props);

    props.meeting.title =  props.meeting.title || 'New Meeting';
    props.meeting.start_date = Utils.dateFromString(props.meeting.start_date || new Date()); 
    props.meeting.end_date = Utils.dateFromString(props.meeting.end_date || new Date());

    this.state = {
      authenticity_token: Utils.getAuthenticityToken(),
      meeting: props.meeting,
      errors: null
    };
  }

  /*
   * Event handler for field updates.
   * Receives a prop in the form of { fieldName: value } as
   * defined by RIEK: https://github.com/kaivi/riek and updates
   * the state with the new value.
   */
  handleFieldUpdate = (prop) => {
    // The field to update
    var updateField = Object.keys(prop)[0];

    // Update the meeting object
    var meeting = this.state.meeting;
    meeting[updateField] = prop[updateField];

    // Set the state with the modified meeting object
    this.setState({ meeting: meeting }, () => console.log(this.state));
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
   * Special event handler for date/time field updates.
   * Taking either 'start' or 'end' as the field argument,
   * pulls the value for ${field}_date and ${field}_time to combine
   * them into a single value.
   */
  handleDateTimeUpdate = (field) => {
    // Get date and time fields
    var date = document.querySelector(`#${field}_date`);
    var time = document.querySelector(`#${field}_time`);

    // Build props object for this.handleFieldUpdate()
    var props = {};
    props[`${field}_date`] = date.value + ' ' + (time != null ? time.value : '00:00:00');

    // Update state with date and time
    this.handleFieldUpdate(props);
  }

  /*
   * Saves the meeting.
   */
  saveMeeting = (field) => {
    axios({
      method: this.state.meeting.id ? 'PATCH' : 'POST',
      url: this.state.meeting.id? `/meetings/${this.state.meeting.id}` : '/meetings',
      data: this.state
    }).then(response => {
      //window.location.href = '/meetings';
      console.log(response);
    }).catch(error => {
      console.log(error.response);
      if (error.response) {
        var errors = error.response.data;
        this.setState({ errors: errors });
      } else {
        console.log(error.message);
      }
    });
  }

  /*
   * Handles the addition of a new adgendum.
   * This will add the new agendum to the meeting agenda,
   * causing a state update.
   */
  handleNewAgendum = (agendum) => {
    var meeting = this.state.meeting;
    var agenda = meeting.agenda;
    agenda.push(agendum);
    
    meeting.agenda = agenda;

    this.setState({ meeting: meeting });
  }

  render() {
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

    return (
      <div>
        {/* Title */}
        <div className="row">
          <div className="col m6">
            <RIEInput
              change={this.handleFieldUpdate}
              value={this.state.meeting.title}
              propName="title"
              className="inline-header" />
          </div>
          {errorsHTML}
        </div>

        {/* Start date & end date */}
        <div className="row">
          <div className="col m4">
            <DatePicker
              id="start_date"
              hintText="Start date"
              onChange={() => this.handleDateTimeUpdate('start')}
              defaultDate={this.state.meeting.start_date} />
          </div>
          <div className="col m4 text-center">to</div>
          <div className="col m4 text-right">
            <DatePicker 
              id="end_date"
              hintText="End date"
              onChange={() => this.handleDateTimeUpdate('end')}
              defaultDate={this.state.meeting.end_date} />
          </div>
        </div>

        {/* Start time & end time */}
        <div className="row">
          <div className="col m4">
            <TimePicker
              id="start_time"
              hintText="Start time"
              onChange={() => this.handleDateTimeUpdate('start')}
              defaultTime={this.state.meeting.start_date}
              format="24hr" />
          </div>
          <div className="col m4 offset-m4 text-right">
            <TimePicker 
              id="end_time"
              hintText="End time"
              onChange={() => this.handleDateTimeUpdate('end')}
              defaultTime={this.state.meeting.end_date}
              format="24hr" />
          </div>
        </div>

        <h5>Agenda</h5>
        <hr />
        <AgendumList 
          agenda={this.state.meeting.agenda} 
          meetingID={this.state.meeting.id}
          handleNewAgendum={this.handleNewAgendum} />

        <a className="waves-effect waves-light btn" onClick={this.saveMeeting}>Save</a>
      </div>
    );
  }
}


var rootNode = document.getElementById('react-root');
var meeting = JSON.parse(rootNode.getAttribute('data-meeting'));

ReactDOM.render(
  <MuiThemeProvider>
    <MeetingForm meeting={meeting} />
  </MuiThemeProvider>,
  document.getElementById('react-root'),
);
