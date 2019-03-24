import React from 'react';

export default class TimePicker extends React.Component {
  periodClasses = (classes, period) => {
    if (this.props.selectedTime.format('A') === period) {
      return classes + " selected";
    } else {
      return classes;
    }
  }

  onTimeChange = (timePart, timeValue, timePeriod) => {
    const updatedTime = this.props.selectedTime.clone();

    if (timePart === 'hour') {
      const convertedHour = timePeriod === 'PM' ? this.convert12HourTo24Hour(timeValue) : timeValue;
      updatedTime.hour(convertedHour).minute(this.props.selectedTime.minute());
    } else {
      updatedTime.minute(timeValue).hour(this.props.selectedTime.hour());
    }

    this.props.onTimeChange(updatedTime.date(this.props.selectedTime.date()));
  }

  onInputClick = (e) => e.target.select();

  convert12HourTo24Hour = (hourValue) => {
    hourValue = parseInt(hourValue);

    if (hourValue !== 12) {
      return hourValue + 12;
    } else {
      return hourValue;
    }
  }

  render() {
    const selectedTime = this.props.selectedTime.clone();
    const selectedTimePeriod = this.props.selectedTime.format('A');

    return (
      <div className="time-input">
        <div className="inputs">
          <input type="number"
            min="1" max="12" step="1"
            value={selectedTime.format('hh')}
            onChange={(e) => this.onTimeChange('hour', e.target.value, selectedTimePeriod)}
            onClick={this.onInputClick}
            ref="hourInput" />

          <span className="separator">:</span>

          <input type="number"
            min="0" max="59" step="1"
            value={selectedTime.format('mm')}
            onChange={(e) => this.onTimeChange('minute', e.target.value, selectedTimePeriod)}
            onClick={this.onInputClick}
            ref="minuteInput" />
        </div>

        <div className="period">
          <button
              className={this.periodClasses("button outline", "AM")}
              onClick={() => this.onTimeChange('hour', this.refs.hourInput.value, 'AM')}>
            AM
          </button>
          <button
              className={this.periodClasses("button outline", "PM")}
              onClick={() => this.onTimeChange('hour', this.refs.hourInput.value, 'PM')}>
            PM
          </button>
        </div>
      </div>
    );
  }
}
