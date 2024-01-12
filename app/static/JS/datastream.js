// checking for username in session
$(document).ready(function() {
  if (sessionStorage.getItem("role") === "admin") {
    $("#admin").css("visibility", "hidden");
    $("#detail").css("visibility", "visible");
    $("#user_manage").css("visibility", "visible");
}
});

// checking for username in session
if(sessionStorage.getItem("username") == null)
{
  window.location.href = "/login";
}


document.addEventListener('DOMContentLoaded', function () {
    function toggleSidebar() {
      var body = document.querySelector('body');
      var sidebar = document.getElementById('sidebar');
  
      // Toggle class to minimize or maximize the layout
      body.classList.toggle('minimized');
  
      // Toggle class to hide or show the sidebar
      sidebar.classList.toggle('hide');
    }
  
    // Click event listener for the whole document
    document.body.addEventListener('click', function (event) {
      var sidebar = document.querySelector('.sidebar');
      var isClickInsideSidebar = sidebar.contains(event.target);
      var isSidebarMinimized = document.body.classList.contains('minimized');
  
      if (!isClickInsideSidebar && !isSidebarMinimized) {
        // Toggle class to minimize the layout
        toggleSidebar();
      }
    });
  
    // TOGGLE SIDEBAR
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
  
    allSideMenu.forEach(item => {
      item.addEventListener('click', function () {
        // Remove 'active' class from all menu items
        allSideMenu.forEach(i => {
          i.parentElement.classList.remove('active');
        });
  
        // Add 'active' class to the clicked menu item
        item.parentElement.classList.add('active');
      });
    });
  
    // Click event listener for the menu icon
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.addEventListener('click', function (event) {
      // Prevent the click event from propagating to the document
      event.stopPropagation();
      // Toggle the sidebar
      toggleSidebar();
    });
  });

// display error msg for users
  $(document).ready(function() {
    if (sessionStorage.getItem("role") === "user") {
      $("#detail").css("visibility", "hidden");
      $("#user_manage").css("visibility", "hidden");
      $("#admin").css("visibility", "visible");
    }
  });




// jwt token delete
function logout() {
  localStorage.clear('access_token');
  sessionStorage.clear();
}