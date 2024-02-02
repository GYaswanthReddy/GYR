// checking for username in session
if (sessionStorage.getItem("username") == null) {
  window.location.href = "/login";
}

$(document).ready(function () {
  console.log("working");
  $("#username").text(`Username : ${sessionStorage.getItem("username").charAt(0).toUpperCase() + sessionStorage.getItem("username").slice(1)}`);
  $("#email").text(`Email : ${sessionStorage.getItem("email")}`);
  $("#role").text(`User : ${sessionStorage.getItem("role").charAt(0).toUpperCase() + sessionStorage.getItem("role").slice(1)}`);
  const expireTime = new Date(sessionStorage.getItem('exp'));
  const newTime = new Date().toLocaleTimeString('en-US', {hour12: true, timeZone: 'UTC'});
  console.log(expireTime.toLocaleTimeString(),"hi",newTime );
  if (expireTime.toLocaleTimeString() < newTime) {
    alert("Session Timeout! Please Login Again");
    logout();
  }
});

// jwt token
document.addEventListener('DOMContentLoaded', function () {
  // To hide or unhide the update password
  document.getElementById('update').addEventListener('click', function (event) {
    $("#account").css('visibility', 'hidden');
    $("#updatepassword").css('visibility', 'visible');

  });
  // To get data from form to updatepassword
  document.getElementById('pass_submit').addEventListener('click', function (event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('form_update'));
    formData.append('oldpassword', $('#password').val());
    formData.append('newpassword', $('#new_password').val());
    formData.append('confirmpassword', $('#confirm_password').val());
    fetch('/updatepassword', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
      body : formData,
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      else {
        throw new Error("Password Not matching");
      }
    }).then(response => {
      console.log(response);
      $('#message').text(response.message);
      setTimeout(() => {
        window.location.href = '/account';
    }, 2000);
    })
      .catch(error => {
        console.log(error);
        $('#message').text(error.message);
      })
})
});

// jwt token delete
function logout() {
  localStorage.clear('access_token');
  sessionStorage.clear();
  window.location.href = '/login';
}