// Functionality for login transition
$(document).ready(function(){
    $("#error_message").css("visibility", "hidden");
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
    if (localStorage.getItem('_grecaptcha') !== null) {
        console.log($("#email").val())
        console.log($("#password").val())
        const formData = new FormData();
        formData.append("username", $("#email").val());
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
            if (response.role !== undefined | response.role !== null) {
                console.log(`${response.role}`,response);
                localStorage.setItem("access_token", `${response.access_token}`);
                sessionStorage.setItem("username", `${response.username}`);
                sessionStorage.setItem("email", `${response.email}`);
                if (response.role !== null) {
                    sessionStorage.setItem("role", `${response.role}`);
                    sessionStorage.setItem('exp', `${response.expire}`);
                }
                if (localStorage.getItem("access_token") !== null) {
                    window.location.href= "/dashboard";
                }
                else {
                    throw new Error("Unexpected response format");
                }
            }   
            else {
                $("#error_message").text("Wrong Credentails");
                $("#error_message").css("visibility", "visible");
            }
        })
        .catch(error => {
            $("#error_message").text("Wrong Credentails");
            $("#error_message").css("visibility", "visible");
            document.getElementById('email').addEventListener('click', function(event)  {
                $("#error_message").css("visibility", "hidden");
            });
        })
} else {
    $("#error_message").text("Please Check Captcha");
    $("#error_message").css("visibility", "visible");
}
});