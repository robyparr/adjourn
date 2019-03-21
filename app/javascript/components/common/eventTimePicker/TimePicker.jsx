import React from 'react';

const TimePicker = (props) => {
  const selectedTime = props.selectedTime.clone();

  return (
    <div className="inline-flex">
      <input type="number"
        min="0" max="24" step="1"
        value={selectedTime.format('HH')}
        onChange={(e) => props.onTimeChange(selectedTime.hour(e.target.value))} />

      <input type="number"
        min="0" max="59" step="1"
        value={selectedTime.format('mm')}
        onChange={(e) => props.onTimeChange(selectedTime.minute(e.target.value))} />
    </div>
  );
};

export default TimePicker;
