$(document).ready(function() {
  $('[data-calendar-list]').on('click', function(e) {
    e.preventDefault();

    var modal = $('#google-calendars-modal')
    modal.find('p.content').hide();
    modal.find('.loading').show();
    modal.modal('open');

    var accountId = $(this).attr('data-calendar-list');
    $.get('/google_calendars?google_account_id=' + accountId)
      .success(function(data) {
        modal.find('.loading').hide();
        modal.find('p.content').html(data).show();
      });
  });
});

$(document).on('change', '.calendar-checkbox', function() {
  var checkbox = $(this);
  var url = checkbox.attr('data-calendar-url');
  var googleId = checkbox.attr('data-calendar-google-id');
  var accountId = checkbox.attr('data-google-account-id');

  if (checkbox.prop('checked')) {
    $.post(url, { google_id: googleId, google_account_id: accountId });
  } else {
    $.ajax({
      type: 'DELETE',
      url: url + '?google_account_id=' + accountId
        + '&google_id=' + encodeURIComponent(googleId)
    });
  }
});