$(document).ready(function() {
  Sidebar = (function() {
    var sidebar = $('.sidebar');
    var sidebarOverlay = $('.sidebar-overlay');

    var sidebarIsHidden = sidebar.css('margin-left').indexOf('-') !== -1;
    sidebar.toggleClass('sidebar-hidden', sidebarIsHidden);

    return {
      isCollapsed: function() {
        return sidebar.hasClass('collapsed');
      },

      collapse: function() {
        sidebar.addClass('collapsed');
      },

      expand: function() {
        sidebar.removeClass('collapsed');
      },

      show: function() {
        sidebar.addClass('shown');
        sidebarOverlay.css('display', 'block');
      },

      hide: function() {
        sidebar.removeClass('shown')
        sidebarOverlay.css('display', 'none');
      }
    };
  })();

  document.addEventListener('click', function(e) {
    if (document.querySelector('.sidebar .collapse-button') === e.target) {
      if (Sidebar.isCollapsed()) {
        Sidebar.expand();
      } else {
        Sidebar.collapse();
      }
    }
  });

  document.addEventListener('click', function(e) {
    if (e.target.id === 'sidebar-menu') {
      Sidebar.expand();
      Sidebar.show();
    }
  });

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('sidebar-overlay')) {
      Sidebar.hide();
    }
  });
});
