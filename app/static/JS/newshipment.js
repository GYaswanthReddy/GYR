// checking for username in session
console.log("lpoading");
if(sessionStorage.getItem("username") == null)
{
  window.location.href = "/login";
}
$(document).ready(function(){
  $("#error-message").css("visibility", "hidden");
  function getCurrentDate() {
    const currentday = new Date();
    const year = currentday.getFullYear();
    const month = (currentday.getMonth() + 1).toString().padStart(2, '0');
    const day = currentday.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
  // Set the minimum date for the date input field
  document.getElementById("delivery_date").min = getCurrentDate();
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
  
  // jwt token retrieval
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submit-form").addEventListener("click", function(event) {
      // event.preventDefault();
        console.log("Dom load");
        fetch("/newshipment", {
              method: "POST",
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                  'Content-Type': 'application/json',
              },
              body : JSON.stringify({
                "shipment_number": $("#shipment_number").val(),
                "container_number": $("#container_number").val(),
                "route_details": $("#route_details").val(),
                "goods_type": $("#goods_type").val(),
                "device": $("#device").val(),
                "delivery_date": $("#delivery_date").val(),
                "po_number": $("#po_number").val(),
                "delivery_number": $("#delivery_number").val(),
                "ndc_number": $("#ndc_number").val(),
                "batch_id": $("#batch_id").val(),
                "serial_number": $("#serial_number").val(),
                "shipment_description": $("#shipment_description").val(),
              }),
          })
              .then(response => {
                  if (response.status === 200) {  
                    return response.json();
                  } 
                  else {
                    $("#msg").text("Please Enter the emplty fields");
                    $("#msg").css("visibility", "visible");
                }
              })
              .then(jsonResponse => {
                // Access and display the message from the jsonResponse
                if (jsonResponse.message) {
                    console.log(jsonResponse.message);
                    $("#msg").text(jsonResponse.message);
                    $("#msg").css("visibility", "visible");
                } else {
                    throw new Error("Unexpected response format");
                }
            })
              .catch(error => {
                $("#msg").text("Please Enter All Fields");
                $("#msg").css("visibility", "visible");
            })
    });
});


// jwt token delete
function logout() {
  localStorage.clear('access_token');
  sessionStorage.clear();
}