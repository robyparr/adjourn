import React from 'react';

import DatePicker from './eventTimePicker/DatePicker';
import TimePicker from './eventTimePicker/TimePicker';

import moment from 'moment';

class EventTimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: moment(),
      to: moment().add('minute', 15),
      pickerIsOpen: false
    };
  }

  componentWillUnmount() {
    this.closePicker();
  }

  onDateTimeSelect = (dateTime, interval, fromTo) => {
    var newDate;
    if (interval === 'date') {
      newDate = this.state[fromTo]
        .year(dateTime.year())
        .month(dateTime.month())
        .date(dateTime.date());
    } else {
      newDate = this.state[fromTo]
        .hour(dateTime.hour())
        .minute(dateTime.minute());
    }

    this.setState({ [fromTo]: newDate });
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
          {`${this.state.from.format('YYYY-MM-DD hh:mm A')} - ${this.state.to.format('hh:mm A')}`}
        </div>
        {this.state.pickerIsOpen &&
          <div className="event-time-picker">
            <div className="row">
              <div className="col sm6">
                <DatePicker onDateSelect={(date) => this.onDateTimeSelect(date, 'date', 'from')} />
              </div>
              <div className="col sm6">
                <h5 className="mt-4">From</h5>
                <TimePicker onTimeChange={(time) => this.onDateTimeSelect(time, 'time', 'from')} />

                <h5 className="mt-4">To</h5>
                <TimePicker onTimeChange={(time) => this.onDateTimeSelect(time, 'time', 'to')} />
              </div>
            </div>
          </div>
        }
      </span>
    );
  }
}

export default EventTimePicker;