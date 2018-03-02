$(document).ready(function() {
  $('.errors[data-errors-for]').each(function () {
    var self = $(this);
    var input = $(self.attr('data-errors-for'));

    input.addClass('invalid');
  });
});