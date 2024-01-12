// Functionality for login transition
$(document).ready(function(){
    $("#error-message").css("visibility", "hidden");
  });
const login_btn = document.querySelector("#login-link");
const register_btn = document.querySelector("#register-link");
const container = document.querySelector(".container");

register_btn.addEventListener("click", () => {
    container.classList.add("login_form");
});


login_btn.addEventListener("click", () => {
    container.classList.remove("login_form");
});

// Functionality for password visiblity
function visible(iconId, passwordId) {
    var icon = document.getElementById(iconId);
    
    icon.style.visibility = 'visible';
}

function togglePasswordVisibility(passwordId, iconId) {
    var password = document.getElementById(passwordId);
    var icon = document.getElementById(iconId);
    
    if (password.type == "password") {
        password.type = "text";
        icon.className = 'bx bx-show';
    } else {
        password.type = "password";
        icon.className = 'bx bxs-low-vision';
    }
}
// Event listener for password icon
document.addEventListener('click', function (event) {
    var clickedElement = event.target;
    var isPasswordField = clickedElement.type === 'password';
    var isPasswordIcon = clickedElement.classList.contains('password-icon');

    if (isPasswordField || isPasswordIcon) {
        clickedElement.id;
        document.getElementById('icon').style.visibility = 'visible';
    } else {
        var passwordIcons = document.querySelectorAll('.password-icon');
        passwordIcons.forEach(function (icon) {
            icon.style.visibility = 'hidden';
        });
    }
});



// jwt token storing in localstorage

document.getElementById('submit-login').addEventListener('click', function(event) {
    // Prevent the default action (navigation to the specified URL)
    event.preventDefault();

    // Now, you can add your custom logic
    console.log($("#email").val())
    console.log($("#password").val())
    const formData = new FormData();
    formData.append("email", $("#email").val());
    formData.append("password", $("#password").val());
    fetch("/login", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if(response.status === 200)
        {
            return response.json();
        }
        else
        {
            throw new Error("User Not Found or Invalid Credentials");
        }
    })
    .then(response => {
        console.log(`${response.role}`);
        localStorage.setItem("access_token", `${response.access_token}`);
        sessionStorage.setItem("username", `${response.username}`);
        sessionStorage.setItem("email", `${response.email}`);
        if (response.role !== null) {
            sessionStorage.setItem("role", `${response.role}`);
        }
        if (localStorage.getItem("access_token") !== null) {
            window.location.href= "/dashboard";
        }
        else {
            throw new Error("Unexpected response format");
        }
    })
    .catch(error => {
        $("#error-message").text(error.message);
        $("#error-message").css("visibility", "visible");
    })

});
