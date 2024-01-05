// Functionality for login transition
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
document.addEventListener("DOMContentLoaded", function() {
    const token = document.getElementById("token_data");
    const access_token = token.textContent;
    console.log(access_token,"this is const");
    localStorage.setItem("access_token", access_token);
    if (access_token) {
        const newToken = access_token;
        window.location.href = `/dashboard/${newToken}`;
    }
});



