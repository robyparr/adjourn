// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var ready = function() {
    // localize times
    $('.localize').each(function () {
        var element = $(this);
        element.html(moment(element.html()).format('LLL'));
    });

    // Fix for Material UI's <AutoComplete /> applying .browser-default
    // to a wrapping div instead of the input element.
    $('div.browser-default').children('input[type=text]').each(function() {
        $(this).addClass('browser-default');
    });
};

$(document).ready(ready);
$(document).on('turbolinks:load', () => setTimeout(ready, 250));
