import React from 'react';

import moment from 'moment';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonth: moment(this.props.selectedDate).utc() || moment().utc(),
      selectedDate: moment(this.props.selectedDate).utc() || null
    };
  }

  nextMonth = () => this.setState({ currentMonth: this.state.currentMonth.add(1, 'month') });
  previousMonth = () => this.setState({ currentMonth: this.state.currentMonth.subtract(1, 'month') });

  onDateClick = (e) => {
    const selectedDate = moment(e.target.dataset.date);

    this.setState({ selectedDate: selectedDate });
    this.props.onDateSelect(selectedDate);
  }


  render() {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const weeks = [];

    const firstDayOfFirstWeekOfMonth = this.state.currentMonth.clone().startOf('month').startOf('week');
    const lastDayOfLastWeekOfMonth = this.state.currentMonth.clone().endOf('month').endOf('week');

    var currentDay = firstDayOfFirstWeekOfMonth.clone();
    while (currentDay <= lastDayOfLastWeekOfMonth) {
      var days = [];

      for (var i = 0; i < 7; i++) {
        var dayClasses = ["day"];
        
        if (currentDay.month() != this.state.currentMonth.month()) {
          dayClasses.push("inactive");
        } else if (currentDay.isSame(this.state.selectedDate, 'date')) {
          dayClasses.push("selected");
        } else if (currentDay.isSame(moment(), 'date')) {
          dayClasses.push("today");
        }

        days.push(
          <div key={`${weeks.length}-${i}`}className={dayClasses.join(" ")}
              data-date={currentDay.format()}
              onClick={(e) => this.onDateClick(e)}>
            {currentDay.clone().date()}
          </div>
        );
        currentDay.add('1', 'days');
      }

      weeks.push(<div key={weeks.length} className="week">{days}</div>);
      days = [];
    }

    return (
      <div className="calendar">
        <div className="header">
          <div className="month-selector" onClick={this.previousMonth}>
            <i className="fa fa-chevron-left"></i>
          </div>
          <div>{this.state.currentMonth.format('MMMM YYYY')}</div>
          <div className="month-selector" onClick={this.nextMonth}>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
        <div className="week">
          {daysOfWeek.map((day, i) => <div key={i} className="day">{day}</div>)}
        </div>
          {weeks.map((week, i) => week)}
      </div>
    );
  }
}

export default DatePicker;