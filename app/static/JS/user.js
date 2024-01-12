// checking for username in session
$(document).ready(function() {
    if (sessionStorage.getItem("role") === "admin") {
      $("#admin").css("visibility", "hidden");
      $("#detail").css("visibility", "visible");
      $("#user_manage").css("visibility", "visible");
  }
  });
  
  // checking for username in session
  
  
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
// jwt token retrieval
 document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("submit").addEventListener("click", function(event) {
        
        const formData = new FormData();
        console.log(("email", $("#email").val()));
        console.log(("role", $("#role").val()));
        formData.append("email", $("#email").val());
        formData.append("role", $("#role").val());
        fetch(`/usermanagement`, {
            method : "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            body : formData 
        }).then(response => {
            if(response.status === 200)
            {
                return response.json();
            }
            else
            {
                throw new Error("User Not Found or Invalid Credentials");
            }
        }).then(response => {
            console.log(response)
        })
        .catch(error => {
            // $("#error-message").text(error.message);
            // $("#error-message").css("visibility", "visible");
        })
    });
});
  
  
  // jwt token delete
  function logout() {
    localStorage.clear('access_token');
    sessionStorage.clear();
  }