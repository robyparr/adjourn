// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var ready = function() {
    // localize times
    $('.localize').each(function () {
        var element = $(this);
        element.html(moment(element.html()).format('LLL'));
    });


    /**
     * Prevent the enter action from going through if the SHIFT
     * key is being pressed. This is to keep newlines from being
     * put into the textareas while submitting the text area using
     * the below event.
     */
    $(document).on('keydown', 'textarea', function(e) {
        if (e.shiftKey && e.keyCode == 13) {
            e.preventDefault();
        }
    });

    /**
     * Blurs the textarea to get the "submit" effect of RIETextArea.
     */
    $(document).on('keyup', 'textarea', function(e) {
        e.preventDefault();
        if (e.shiftKey && e.keyCode == 13) {
            e.target.blur();
        }
    });
};

$(document).ready(ready);
$(document).on('turbolinks:load', ready);
