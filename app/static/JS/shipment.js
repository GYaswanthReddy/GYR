// checking for username in session
if (sessionStorage.getItem("username") == null) {
  window.location.href = "/login";
}

// jwt retrieval
$(document).ready(function () {
  fetch(`/shipmentdata`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      return response.json();
    }).then(response => {
      console.log(response, "before if");
      if (response.hasOwnProperty("detail") && response.detail === "Token has expired") {
        alert("Session has expired! Please login again.");
        logout()
      }
      console.log(typeof response, response);
      let shipment_data = "";
      for (let shipment_no = 0; shipment_no < response.length; shipment_no++) {
        const shipment = response[shipment_no];

        shipment_data = shipment_data + "<tr><td>"
          + shipment.email + "</td><td>"
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
    })
    .catch(error => {
      console.log(error.message);
    })
});


// jwt token delete
function logout() {
  localStorage.clear('access_token');
  sessionStorage.clear();
  window.location.href = '/login';
}