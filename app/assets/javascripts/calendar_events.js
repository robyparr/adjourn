$(document).ready(function() {
  if ($('#calendar-events').length > 0) {
    $.get('/calendar_events')
      .success(function(data) {
        $('#calendar-events').html(data);
      });
  }
});