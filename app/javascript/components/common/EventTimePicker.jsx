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
      pickerIsOpen: false,
      errors: [],
      disableSaveButton: false
    };
  }

  onDateSelect = (date, fromTo) => {
    const newState = { [fromTo]: this.state[fromTo].clone() };
    newState[fromTo]
      .year(date.year())
      .month(date.month())
      .date(date.date());

    const fromToOpposite = fromTo === 'from' ? 'to' : 'from';
    newState[fromToOpposite] = this.state.to.clone()
      .year(date.year())
      .month(date.month())
      .date(date.date());

    this.setState(newState, this.validateDateTimes);
  }

  onTimeChange = (time, fromTo) => {
    const newState = { [fromTo]: this.state[fromTo].clone() };
    newState[fromTo].hour(time.hour).minute(time.minute);

    this.setState(newState, this.validateDateTimes);
  }

  validateDateTimes = () => {
    const newErrors = [];

    if (this.state.from.isAfter(this.state.to)) {
      newErrors.push('"To" must be after "From"');
    }

    this.setState({ errors: newErrors, disableSaveButton: newErrors.length > 0 });
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

  onTimePickerError = (timePickerHasErrors) => {
    this.setState({ disableSaveButton: timePickerHasErrors });
  }

  render() {
    const formattedFromDate = this.state.from.local().format('LL');
    const formattedFromTime = this.state.from.local().format('hh:mm A');
    const formattedToTime = this.state.to.local().format('hh:mm A');

    return (
      <span ref="self">
        <div className="text-gray-800 cursor-pointer" onClick={this.openPicker}>
          {formattedFromDate} <span className="text-gray-700">from </span>
          {formattedFromTime} <span className="text-gray-700"> to </span>
          {formattedToTime}
        </div>
        {this.state.pickerIsOpen &&
          <div className="event-time-picker">
            <div className="row mb-0">
              <div className="column sm12 md6">
                <DatePicker
                  selectedDate={this.state.from}
                  onDateSelect={(date) => this.onDateSelect(date, 'from')} />
              </div>
              <div className="column sm12 md6 relative" style={{ paddingBottom: 70 }}>
                <h5 className="mt-4">From</h5>
                <TimePicker
                  initialTime={this.state.from}
                  onTimeChange={(time) => this.onTimeChange(time, 'from')}
                  onError={this.onTimePickerError} />

                <h5 className="mt-4">To</h5>
                <TimePicker
                  initialTime={this.state.to}
                  onTimeChange={(time) => this.onTimeChange(time, 'to')}
                  onError={this.onTimePickerError} />

                {this.state.errors.length > 0 &&
                  <div className="alert error mt-4">
                    {this.state.errors.map((error, index) => (
                      <div key={index} className="text-red">{error}</div>
                    ))}
                  </div>
                }
                <div className="action-buttons">
                  <button className="button" onClick={this.onCancelButtonClick}>Cancel</button>
                  <button className="button primary"
                    disabled={this.state.disableSaveButton}
                    onClick={this.onSaveButtonClick}>Save</button>
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
