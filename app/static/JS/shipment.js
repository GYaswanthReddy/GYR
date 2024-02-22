// checking for username in session
if(sessionStorage.getItem("username") == null)
{
  window.location.href = "/login";
}
 // session timeout checking
//  $(document).ready(function(){
//  const expireTime = new Date(sessionStorage.getItem('exp'));
//  const newTime = new Date().toLocaleTimeString('en-US', {hour12: true, timeZone: 'UTC'});
//   console.log(expireTime.toLocaleTimeString(),"hi",newTime );
//   if (expireTime.toLocaleTimeString() < newTime) {
//     alert("Session Timeout! Please Login Again");
//     logout();
//   }
// });
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
        console.log(typeof response);
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
      }).catch(error => {
        console.log("data hasn't pushed to html");
      })
    });


// jwt token delete
function logout() {
  localStorage.clear('access_token');
  sessionStorage.clear();
  window.location.href = '/login';
}