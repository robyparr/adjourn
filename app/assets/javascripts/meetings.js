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

  $('#new-meeting-form').on('ajax:success', function(response) {
    window.location = response.detail[0].resource_url;
  }).on('ajax:error', function(response) {
    var errorResponse = response.detail[0].errors;
    var errorsListItems = "";
    for(var i = 0; i < errorResponse.length; i++) {
      errorsListItems += "<li>" + errorResponse[i] + "</li>";
    }

    var errors = $('#new-meeting-form').find('.error');
    errors.find('ul').html(errorsListItems);
    errors.css('display', 'block');
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