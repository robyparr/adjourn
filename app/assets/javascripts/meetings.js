// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var ready = function() {
    // localize times
    $('.localize').each(function () {
        var element = $(this);
        element.html(moment(element.html()).format('LLL'));
    });
};

$(document).ready(ready);
$(document).on('turbolinks:load', ready);
