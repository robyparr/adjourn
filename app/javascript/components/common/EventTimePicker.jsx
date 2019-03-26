import React from 'react';

import DatePicker from './eventTimePicker/DatePicker';
import TimePicker from './eventTimePicker/TimePicker';

import moment from 'moment';

class EventTimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.calculateOriginalState();
  }

  calculateOriginalState = () => {
    return {
      from: moment(this.props.from).utc(),
      to: moment(this.props.to).utc(),
      pickerIsOpen: false
    };
  }

  onDateTimeSelect = (dateTime, interval, fromTo) => {
    const newState = { [fromTo]: this.state[fromTo].clone() };

    if (interval === 'date') {
      newState[fromTo]
        .year(dateTime.year())
        .month(dateTime.month())
        .date(dateTime.date());
    } else {
      newState[fromTo]
        .hour(dateTime.hour())
        .minute(dateTime.minute());
    }

    if (interval === 'date') {
      newState[fromTo === 'from' ? 'to' : 'from'] = this.state.to.clone()
        .year(dateTime.year())
        .month(dateTime.month())
        .date(dateTime.date());
    } else {
      if (fromTo === 'from' && newState[fromTo].isAfter(this.state.to)) {
        newState.to = newState[fromTo].clone().add('minute', 15);
      }
    }

    this.setState(newState);
  }

  openPicker = () => this.setState({ pickerIsOpen: true });
  closePicker = () => this.setState({ pickerIsOpen: false });

  onSaveButtonClick = () => {
    this.props.onChange({
      start_date: this.state.from,
      end_date: this.state.to
    });
    this.closePicker();
  }

  onCancelButtonClick = () => {
    this.setState(this.calculateOriginalState());
    this.closePicker();
  }

  render() {
    const formattedFromDate = this.state.from.local().format('LL');
    const formattedFromTime = this.state.from.local().format('hh:mm A');
    const formattedToTime = this.state.to.local().format('hh:mm A');

    return (
      <span ref="self">
        <div className="text-grey-darkest cursor-pointer" onClick={this.openPicker}>
          {formattedFromDate} <span className="text-grey-darker">from </span>
          {formattedFromTime} <span className="text-grey-darker"> to </span>
          {formattedToTime}
        </div>
        {this.state.pickerIsOpen &&
          <div className="event-time-picker">
            <div className="row mb-0">
              <div className="column sm12 md6">
                <DatePicker
                  selectedDate={this.state.from}
                  onDateSelect={(date) => this.onDateTimeSelect(date, 'date', 'from')} />
              </div>
              <div className="column sm12 md6 relative" style={{ paddingBottom: 70 }}>
                <h5 className="mt-4">From</h5>
                <TimePicker
                  selectedTime={this.state.from}
                  onTimeChange={(time) => this.onDateTimeSelect(time, 'time', 'from')} />

                <h5 className="mt-4">To</h5>
                <TimePicker
                  selectedTime={this.state.to}
                  onTimeChange={(time) => this.onDateTimeSelect(time, 'time', 'to')} />

                <div className="action-buttons">
                  <button className="button" onClick={this.onCancelButtonClick}>Cancel</button>
                  <button className="button primary" onClick={this.onSaveButtonClick}>Save</button>
                </div>
              </div>
            </div>
          </div>
        }
      </span>
    );
  }
}

export default EventTimePicker;