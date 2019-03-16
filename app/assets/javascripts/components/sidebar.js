$(document).ready(function() {
  Sidebar = (function() {
    var mainContent = $('.content');
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
        mainContent.addClass('with-collapsed-sidebar');
      },

      expand: function() {
        sidebar.removeClass('collapsed');
        mainContent.removeClass('with-collapsed-sidebar');
      },

      show: function() {
        sidebar.removeClass('sidebar-hidden');
        sidebar.css('margin-left', '0');
        sidebarOverlay.css('display', 'block');
      },

      hide: function() {
        setTimeout(function() {
          sidebar.addClass('sidebar-hidden');
        }, 500);
        sidebar.css('margin-left', '-80%');
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