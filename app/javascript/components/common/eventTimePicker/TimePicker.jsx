import React from 'react';

import moment from 'moment';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTime: moment()
    };
  }

  onTimeChange = (e, interval) => {
    this.setState({
      selectedTime: this.state.selectedTime[interval](e.target.value)
    }, () => this.props.onTimeChange(this.state.selectedTime));
  }

  render() {
    return (
      <div className="inline-flex">
        <input type="number"
          min="0" max="24" step="1"
          value={this.state.selectedTime.format('HH')}
          onChange={(e) => this.onTimeChange(e, 'hour')} />

        <input type="number"
          min="0" max="59" step="1"
          value={this.state.selectedTime.format('mm')}
          onChange={(e) => this.onTimeChange(e, 'minute')} />
      </div>
    );
  }
}

export default TimePicker;