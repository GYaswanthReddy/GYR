// Functionality for login transition
$(document).ready(function () {
    $("#error_message").css("visibility", "hidden");
    $("#register_msg").css("visibility", "hidden");
    $("#register_error_msg").css("visibility", "hidden");
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
    let icon = document.getElementById(iconId);

    icon.style.visibility = 'visible';
}

function togglePasswordVisibility(passwordId, iconId) {
    let password = document.getElementById(passwordId);
    let icon = document.getElementById(iconId);

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
    let clickedElement = event.target;
    let isPasswordField = clickedElement.type === 'password';
    let isPasswordIcon = clickedElement.classList.contains('password-icon');

    if (isPasswordField || isPasswordIcon) {
        document.getElementById('icon').style.visibility = 'visible';
    } else {
        let passwordIcons = document.querySelectorAll('.password-icon');
        passwordIcons.forEach(function (icon) {
            icon.style.visibility = 'hidden';
        });
    }
});

// jwt token storing in localstorage
document.getElementById('submit-login').addEventListener('click', function (event) {
    // Prevent the default action (navigation to the specified URL)
    if (localStorage.getItem('_grecaptcha') !== null) {
        console.log($("#email").val())
        console.log($("#password").val())
        const formData = new FormData(document.getElementById("loginForm"));
        formData.append("username", $("#email").val());
        formData.append("password", $("#password").val());
        if (formData.get("password") !== "") {
            event.preventDefault();
            fetch("/login", {
                method: "POST",
                body: formData
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        response.json().then(error => {
                            $("#error_message").text(error.msg);
                            $("#error_message").css("visibility", "visible");
                        })
                    }
                })
                .then(response => {
                    if (response.role !== undefined || response.role !== null) {
                        console.log(`${response.role}`, response);
                        localStorage.setItem("access_token", `${response.access_token}`);
                        sessionStorage.setItem("username", `${response.username}`);
                        sessionStorage.setItem("email", `${response.email}`);
                        if (response.role !== null) {
                            sessionStorage.setItem("role", `${response.role}`);
                            sessionStorage.setItem('exp', `${response.expire}`);
                        }
                        if (localStorage.getItem("access_token") !== null) {
                            window.location.href = "/dashboard";
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
                    console.log(error);
                    $("#error_message").text(error.msg);
                    $("#error_message").css("visibility", "visible");
                })
        } else {
            $("#error_message").text("Please Check Captcha");
            $("#error_message").css("visibility", "visible");
        }
        document.getElementById('email').addEventListener('click', function (event) {
            $("#error_message").css("visibility", "hidden");
        });
    }
});

// fetch api for register
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('register_submit').addEventListener('click', function (event) {
        // Prevent the default action (navigation to the specified URL)
        console.log($("#username").val())
        console.log($("#register-email").val())
        const formData = new FormData(document.getElementById("register_form"));
        formData.append("username", $("#username").val());
        formData.append("email", $("#register-email").val());
        formData.append("new_password", $("#new_password").val());
        formData.append("confirm_password", $("#confirm_password").val());
        if (formData.get('confirm_password') !== "") {
            event.preventDefault();
            fetch("/register", {
                method: "POST",
                body: formData
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        response.json().then(error => {
                            console.log(error);
                            $("#register_error_msg").text(error.msg);
                            $("#register_error_msg").css("visibility", "visible");
                            setTimeout(() => {
                                $("#register_error_msg").css("visibility", "hidden");
                            }, 4000);
                        })
                    }
                })
                .then(response => {
                    console.log(response);
                    $("#register_msg").text(response.success_msg);
                    $("#register_msg").css("visibility", "visible");
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 2000);
                })
                .catch(error => {
                    console.log(error);
                })
            document.getElementById('register-email').addEventListener('click', function (event) {
                $("#register_error_msg").css("visibility", "hidden");
            });
        }
    })
});