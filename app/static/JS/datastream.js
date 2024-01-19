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
  
// jwt and data from form and send it to datastream post
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("submit-form").addEventListener("click", function(event) {
    event.preventDefault();
      console.log("Dom load");
      // const formData = new FormData(document.getElementById('device_form'));
      // formData.append("device_id", $("#device_id").val());
      // console.log(formData);
      console.log(document.getElementById('device_id').innerText);
      const formData = new FormData(document.getElementById("device_form"));
      
      // const selectedDeviceId = formData.get("device_id");
      formData.append('device',$('#device_id').val());
      console.log(formData.get('device_id'), typeof formData.get('device_id'));
      fetch("/datastream", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            body : formData
        })
            .then(response => {
                if (response.status === 200) {  
                  return response.json();
                }
            }).then(response => {
              console.log(response.device.length);
              // console.log(response.device);
              
              let device_data = "";
              console.log(response.device.length);
              for (var no = 0; no < response.device.length; no++) {
                console.log(response.device.length);
                const device_details = response.device[no];
                console.log(device_details);
                device_data +=  "<tr><td>"
                    + device_details.Device_id + "</td><td>"
                    + device_details.Battery_level + "</td><td>"
                    + device_details.First_sensor_temp + "</td><td>"
                    + device_details.Route_from + "</td><td>"
                    + device_details.Route_to + "</td><td>"
                    + device_details.Timestamp + "</td></tr>";
            }
              $("#table_body").html(device_data)
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