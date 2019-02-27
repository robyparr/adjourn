// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
  // localize times
  $('.localize').each(function () {
    var element = $(this);
    var formattedDate = moment.utc(element.html(), "YYYY-MM-DD HH:mm")
    .local()
    .format('LLL');
    element.html(formattedDate);
  });

  // Fix for Material UI's <AutoComplete /> applying .browser-default
  // to a wrapping div instead of the input element.
  $('div.browser-default').children('input[type=text]').each(function() {
    $(this).addClass('browser-default');
  });

});

  function openAgendumDetailsView() {
    var agendumDetails = $('#agendum-details-tab');

    if (!agendumDetails.hasClass('active')) {
      if (screen.width > 576) {
        agendumDetails.click();
      }
    }
  }