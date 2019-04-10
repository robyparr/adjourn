import React from 'react';

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hour: props.initialTime.format('hh'),
      minute: props.initialTime.format('mm'),
      timePeriod: props.initialTime.format('A'),
      errors: []
    };
  }
  periodClasses = (classes, period) => {
    if (this.state.timePeriod === period) {
      return classes + " selected";
    } else {
      return classes;
    }
  }

  validateTimeParts = () => {
    const newErrors = {};
    const hour = parseInt(this.state.hour);
    const minute = parseInt(this.state.minute);

    if (isNaN(hour) || hour <= 0 || hour > 12) {
      newErrors.hour = 'Hour must be between 1 and 12';
    } else if (isNaN(minute) || minute < 0 || minute > 59) {
      newErrors.minute = 'Minute must be between 0 and 59';
    }

    const hasErrors = Object.keys(newErrors).length > 0;
    this.setState({ errors: newErrors }, () => this.props.onError(hasErrors));
  }

  onTimeChange = (timePart, timeValue) => {
    this.setState({ [timePart]: timeValue }, () => {
      this.validateTimeParts();

      const momentHour = this.state.timePeriod === 'PM' ?
        this.convert12HourTo24Hour(this.state.hour)
        : this.state.hour;

      this.props.onTimeChange({
        hour: momentHour,
        minute: this.state.minute
      });
    });
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
    return (
      <div className="time-input">
        <div className="inputs">
          <input type="tel"
            className={this.state.errors.hour ? 'error' : ''}
            min="1" max="12" step="1"
            value={this.state.hour}
            onChange={(e) => this.onTimeChange('hour', e.target.value)}
            onClick={this.onInputClick}
            ref="hourInput" />

          <span className="separator">:</span>

          <input type="tel"
            min="0" max="59" step="1"
            className={this.state.errors.minute ? 'error' : ''}
            value={this.state.minute}
            onChange={(e) => this.onTimeChange('minute', e.target.value)}
            onClick={this.onInputClick}
            ref="minuteInput" />
        </div>

        <div className="period">
          <button
              className={this.periodClasses("button outline", "AM")}
              onClick={() => this.onTimeChange('timePeriod', 'AM')}>
            AM
          </button>
          <button
              className={this.periodClasses("button outline", "PM")}
              onClick={() => this.onTimeChange('timePeriod', 'PM')}>
            PM
          </button>
        </div>

        <div className="text-red">{this.state.errors.hour}</div>
        <div className="text-red">{this.state.errors.minute}</div>
      </div>
    );
  }
}
