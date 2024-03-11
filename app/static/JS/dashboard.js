// checking for username in session
if(sessionStorage.getItem("username") == null)
{
  window.location.href = "/login";
}

$(document).ready(function() {
  $("#user_name").text(sessionStorage.getItem('username').toUpperCase());
});


// jwt token delete
function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = '/login';
}

