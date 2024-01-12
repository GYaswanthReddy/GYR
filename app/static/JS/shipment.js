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
// jwt retrieval
$(document).ready(function(){
  const token = localStorage.getItem("access_token");
  fetch(`/shipmentdata`,{
  method : "GET",
    headers : {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
        if (response.status !== 200) {
          throw new Error(`Status ${response.status}`);
        }
        return response.json();
      }).then(response => {
        console.log(response);
        let shipment_data = "";
        for (let shipment_no = 0; shipment_no < response.length; shipment_no++) {
            const shipment = response[shipment_no];
    
            shipment_data = shipment_data + "<tr><td>" 
            + shipment.shipment_number + "</td><td>"
            + shipment.container_number + "</td><td>"
            + shipment.route_details + "</td><td>"
            + shipment.goods_type + "</td><td>"
            + shipment.device + "</td><td>"
            + shipment.delivery_date + "</td><td>"
            + shipment.po_number + "</td><td>"
            + shipment.delivery_number + "</td><td>"
            + shipment.ndc_number + "</td><td>"
            + shipment.batch_id + "</td><td>"
            + shipment.serial_number + "</td><td>"
            + shipment.shipment_description + "</td></tr>"
        }
        console.log(shipment_data);
        $("#table_data").html(shipment_data);
        console.log(data);
      }).catch(error => {
        console.log("data hasn't pushed to html");
      })
    });


// jwt token delete
function logout() {
  localStorage.clear('access_token');
  sessionStorage.clear();
}