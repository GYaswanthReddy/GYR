// checking for username in session
if(sessionStorage.getItem("username") == null)
{
  window.location.href = "/login";
}

$(document).ready(function() {
  $("#user_name").text(sessionStorage.getItem('username').toUpperCase());
  // console.log('before all',new Date(sessionStorage.getItem('exp')));
  const expireTime = new Date(sessionStorage.getItem('exp'));
  // console.log('before storing in session',expireTime);
  const newTime = new Date().toLocaleTimeString('en-US', {hour12: true, timeZone: 'UTC'});
  console.log(expireTime.toLocaleTimeString(),"hi",newTime );
  if (expireTime.toLocaleTimeString() < newTime) {
    alert("Session Timeout! Please Login Again");
    logout();
  }
});


// jwt token delete
function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = '/login';
}

