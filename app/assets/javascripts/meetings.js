// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
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

    $('.tooltipped').tooltip();

    $('.collapsible').collapsible();

    $('.autocomplete').easyAutocomplete({
        url: function(q) {
            return "/search?q=" + q;
        },
        requestDelay: 250,
        getValue: function(element) {
            return element.meeting.title
        },
        template: {
            type: "custom",
            method: function(value, item) {
                return (
                    "<span class='markdown-body sub-content'><code>" + item.result_type + "</code></span>"
                    + "<h5>"
                        + value
                        + "<span class='sub'>" + moment(item.meeting.date).format('LLL') + "</span>"
                    + "</h5>"
                    + "<p>" + item.content + "</p>"
                );
            }
        },
        list: {
            onChooseEvent: function() {
                var data = $('.autocomplete').getSelectedItemData();
                window.location.href = data.meeting.resource_url;
            }
        }
    }).on('focus', function() {
        $(this).parents('.input-field').find('i.material-icons.prefix').addClass('black-text');
    }).on('blur', function() {
        $(this).parents('.input-field').find('i.material-icons.prefix').removeClass('black-text');
    });
});

function openAgendumDetailsView() {
    var agendumDetails = $('#agendum-details');

    if (!agendumDetails.hasClass('active')) {
        $('.sidebar .collapsible').collapsible('open', 2);
    }
}