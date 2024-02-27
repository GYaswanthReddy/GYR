// checking for username in session
if (sessionStorage.getItem("username") == null) {
  window.location.href = "/login";
}

// checking for username in session and checking for session timeout
$(document).ready(function () {
  if (sessionStorage.getItem("role") === "admin") {
    $("#admin").css("visibility", "hidden");
    $("#detail").css("visibility", "visible");
    $("#user_manage").css("visibility", "visible");
  }
});


// display error msg for users
$(document).ready(function () {
  if (sessionStorage.getItem("role") === "user") {
    $("#detail").css("visibility", "hidden");
    $("#user_manage").css("visibility", "hidden");
    $("#admin").css("visibility", "visible");
  }
});

// jwt and data from form and send it to datastream post
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submit-form").addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Dom load");
    console.log(document.getElementById('device_id').innerText);
    const formData = new FormData(document.getElementById("device_form"));
    formData.append('device', $('#device_id').val());
    console.log(formData.get('device_id'), typeof formData.get('device_id'));
    fetch("/datastream", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData
    })
      .then(response => {
        return response.json();
      }).then(response => {
        if (response.hasOwnProperty("detail") && response.detail === "Token has expired") {
          alert("Session has expired! Please login again.");
          logout()
        } else {
          console.log(response.device.length);

          let device_data = "";
          console.log(response.device.length);
          for (const device_details of response.device) {
            device_data += "<tr><td>"
              + device_details.Device_id + "</td><td>"
              + device_details.Battery_level + "</td><td>"
              + device_details.First_sensor_temp + "</td><td>"
              + device_details.Route_from + "</td><td>"
              + device_details.Route_to + "</td><td>"
              + device_details.Timestamp + "</td></tr>";
          }
          $("#table_body").html(device_data)
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
  window.location.href = '/login';
}