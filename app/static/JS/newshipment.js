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

  
  // jwt token retrieval
const accessToken = localStorage.getItem("access_token");
console.log(accessToken);
fetch('/newshipment', {
  method : "GET",
  headers : {
    'Authorization' : `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
}) 
.catch(error => console.error('Error:', error));


// jwt token delete
function logout() {
  localStorage.clear('access_token')
}