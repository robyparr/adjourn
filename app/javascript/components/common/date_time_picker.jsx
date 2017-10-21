import React, { Component } from 'react';

import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'rc-time-picker';

// Utilities
import moment from 'moment';

export default class DateTimePicker extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            dateTime: moment.isMoment(this.props.dateTime) ?
                this.props.dateTime
                : moment(this.props.dateTime)
        };
    }

    /*
     * Handles updating the date or time portion of this.state.dateTime
     * and passing it to the onChange handler.
     */
    handleDateTimeUpdate = (fieldType, date) => {
        var newValue = this.state.dateTime;

        if (fieldType === 'date') {
            newValue.year(date.year());
            newValue.month(date.month());
            newValue.date(date.date());
        } else {
            newValue.hour(date.hour());
            newValue.minute(date.minute());
            newValue.second(date.second());
        }

        var newUtcValue = moment.utc(newValue).format();
        this.props.onChange(this.props.name, newUtcValue);
    }

    render() {
        var datePickerStyles = {
            width: 80,
            textAlign: 'center',
            height: 'inherit'
        };

        return (
            <div style={{ width: 170 }}>
                <TimePicker
                    showSecond={false}
                    defaultValue={this.state.dateTime}
                    onChange={(time) => this.handleDateTimeUpdate('time', time)}
                    format="h:mm a"
                    className="right time-picker"
                    use12Hours={true} />
                
                <DatePicker
                    id="start_date"
                    hintText="Start date"
                    onChange={(_, date) => this.handleDateTimeUpdate('date', moment(date))}
                    defaultDate={this.state.dateTime.toDate()}
                    container="inline"
                    className="date-picker"
                    textFieldStyle={datePickerStyles} />
            </div>
        );
    }
}