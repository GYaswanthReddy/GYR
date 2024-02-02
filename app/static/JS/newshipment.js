// checking for username in session
console.log("lpoading");
if (sessionStorage.getItem("username") == null) {
  window.location.href = "/login";
}

$(document).ready(function () {
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

// jwt token retrieval
document.addEventListener("DOMContentLoaded", function () {
  // Session timeout checking
  const expireTime = new Date(sessionStorage.getItem('exp'));
  const newTime = new Date().toLocaleTimeString('en-US', {hour12: true, timeZone: 'UTC'});
  console.log(expireTime.toLocaleTimeString(),"hi",newTime );
  if (expireTime.toLocaleTimeString() < newTime) {
    alert("Session Timeout! Please Login Again");
    logout();
  }
  document.getElementById("submit-form").addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Dom load");
    fetch("/newshipment", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
          response.json().then(response => {
            $("#msg").text(response.message);
            $("#msg").css("visibility", "visible");
          });
        }
      })
      .then(response => {
        // Access and display the message from the response
        if (response.message) {
          // event.preventDefault();
          console.log(response.message);
          $("#msg").text(response.message);
          $("#msg").css("visibility", "visible");
          setTimeout(() => {
            window.location.href = '/newshipment';
          },2000);
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
  window.location.href = '/login';
}