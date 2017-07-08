import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Controls
import { RIEInput } from 'riek';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'rc-time-picker';

import AgendumList from './agendum/agendum_list';
import DateTimePicker from './common/date_time_picker';

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
class MeetingForm extends Component {

  constructor(props) {
    super(props);

    props.meeting.title =  props.meeting.title || 'New Meeting';
    props.meeting.start_date = props.meeting.start_date || moment().toDate();
    props.meeting.end_date = props.meeting.end_date || moment().add(1, 'hours').toDate();

    this.state = {
      authenticity_token: Utils.getAuthenticityToken(),
      meeting: props.meeting,
      agenda: props.meeting.agenda || [],
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
    this.saveMeeting();
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
    }).then(response => this.setState({ meeting: response.data }))
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
          <div className="col m6">
            <RIEInput
              change={this.handleFieldUpdate}
              value={this.state.meeting.title}
              propName="title"
              className="inline-header" />
          </div>
          {errorsHTML}
        </div>

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

        {this.state.meeting.id &&
          <div>
            <h5>Agenda</h5>
            <hr />
            <AgendumList 
              agenda={this.state.agenda} 
              meetingID={this.state.meeting.id}
              handleAgendumAddRemove={this.handleAgendumAddRemove} />
          </div>
        }

        {!this.state.meeting.id &&
          <a className="waves-effect waves-light btn" onClick={this.saveMeeting}>Save</a>
        }
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
