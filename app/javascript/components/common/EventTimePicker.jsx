import React from 'react';

import DatePicker from './EventTimePicker/DatePicker';
import TimePicker from './EventTimePicker/TimePicker';

import moment from 'moment';

class EventTimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: moment(props.from).utc(),
      to: moment(props.to).utc(),
      pickerIsOpen: false
    };
  }

  componentWillUnmount() {
    this.closePicker();
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

    this.setState(newState, () => {
      this.props.onChange({
        start_date: this.state.from,
        end_date: this.state.to
      })
    });
  }

  openPicker = () => {
    this.setState({ pickerIsOpen: true });
    document.addEventListener('click', this.closePicker);
  }

  closePicker = (e) => {
    if (this.refs.self !== e.target && !this.refs.self.contains(e.target)) {
      this.setState({ pickerIsOpen: false });
      document.removeEventListener('click', this.closePicker);
    }
  }

  render() {
    return (
      <span ref="self">
        <div className="text-grey-darkest cursor-pointer" onClick={this.openPicker}>
          {`${this.state.from.local().format('YYYY-MM-DD hh:mm A')} - ${this.state.to.local().format('hh:mm A')}`}
        </div>
        {this.state.pickerIsOpen &&
          <div className="event-time-picker">
            <div className="row">
              <div className="col sm6">
                <DatePicker
                  selectedDate={this.state.from}
                  onDateSelect={(date) => this.onDateTimeSelect(date, 'date', 'from')} />
              </div>
              <div className="col sm6">
                <h5 className="mt-4">From</h5>
                <TimePicker
                  selectedTime={this.state.from}
                  onTimeChange={(time) => this.onDateTimeSelect(time, 'time', 'from')} />

                <h5 className="mt-4">To</h5>
                <TimePicker
                  selectedTime={this.state.to}
                  onTimeChange={(time) => this.onDateTimeSelect(time, 'time', 'to')} />
              </div>
            </div>
          </div>
        }
      </span>
    );
  }
}

export default EventTimePicker;