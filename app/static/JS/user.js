// checking for username in session
$(document).ready(function () {
  if (sessionStorage.getItem("role") === "admin") {
    $("#admin").css("visibility", "hidden");
    $("#detail").css("visibility", "visible");
    $("#user_manage").css("visibility", "visible");
  }
});

// display error msg for users
$(document).ready(function () {
  // session timeout checking
  const expireTime = new Date(sessionStorage.getItem('exp'));
  const newTime = new Date().toLocaleTimeString('en-US', {hour12: true, timeZone: 'UTC'});
  console.log(expireTime.toLocaleTimeString(),"hi",newTime );
  if (expireTime.toLocaleTimeString() < newTime) {
    alert("Session Timeout! Please Login Again");
    logout();
  }
  else if (sessionStorage.getItem("role") === "user") {
    $("#detail").css("visibility", "hidden");
    $("#user_manage").css("visibility", "hidden");
    $("#admin").css("visibility", "visible");
  }
});
// jwt token retrieval
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    const formData = new FormData();
    console.log(("email", $("#email").val()));
    console.log(("role", $("#role").val()));
    formData.append("email", $("#email").val());
    formData.append("role", $("#role").val());
    fetch(`/usermanagement`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      }
      else {
        return response.json().then(error => {
          throw new Error(error.message);
        });
      }
    }).then(response => {
      console.log(response);
      $("#msg").text(response.message);
      $("#msg").css("visibility", "visible");
      setTimeout(() => {
        window.location.href = '/usermanagement';
      },2000);
    })
      .catch(error => {
        $("#msg").text(error.message);
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