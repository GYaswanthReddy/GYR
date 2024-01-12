// checking for username in session
if(sessionStorage.getItem("username") == null)
{
  window.location.href = "/login";
}

$(document).ready(function(){
  console.log("working");
  $("#username").text(`Username: ${sessionStorage.getItem("username")}`);
  $("#email").text(`Email: ${sessionStorage.getItem("email")}`);
  $("#role").text(`User: ${sessionStorage.getItem("role")}`);
});


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





// jwt token 

  // var token = {"access" : localStorage.getItem("access_token")};
  // var url = urlpara;
  // console.log(url, " this is url")
  // if (token) {
  //   fetch(`/account`, {
  //     method : "GET",
  //     headers : {
  //       "Content-Type" : "application/json",
  //     },
  //     body:  JSON.stringify(token),
  //   })
  //   .then(response => response.json())
  //   .then(data)
  //   console.log(data)
  //   var name = document.getElementById("username");
  //   name.innerText += data.username;
  // }
  // else { 
  //   console.log("token not found");
  // }
  

// jwt token delete
function logout() {
  localStorage.clear('access_token');
  sessionStorage.clear();
}