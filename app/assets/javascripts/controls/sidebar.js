$(document).ready(function() {
  Sidebar = (function() {
    var mainContent = $('.content');
    var sidebar = $('.sidebar');
  
    return {
      isCollapsed: function() {
        return sidebar.hasClass('collapsed');
      },
  
      collapse: function() {
        sidebar.addClass('collapsed');
        mainContent.addClass('with-collapsed-sidebar');
      },
  
      expand: function() {
        sidebar.removeClass('collapsed');
        mainContent.removeClass('with-collapsed-sidebar');
      }
    };
  })();

  $(document).on('click', '.sidebar .collapse-button', function() {
    if (Sidebar.isCollapsed()) {
      Sidebar.expand();
    } else {
      Sidebar.collapse();
    }
  });
});