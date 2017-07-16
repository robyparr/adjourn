import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Controls
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'rc-time-picker';

import AgendumList from './agendum/agendum_list';
import DateTimePicker from './common/date_time_picker';
import InlineEdit from './common/inline_edit';

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
          <div className="col m12">
            <InlineEdit
              name="title"
              onChange={this.handleFieldUpdate}
              displayElement='h4'
              value={this.state.meeting.title} />
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
