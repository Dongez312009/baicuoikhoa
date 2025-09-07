document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorDiv = document.getElementById("registerError");
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (username.length < 6 || username.length > 18) {
        errorDiv.textContent = "Tên đăng nhập phải từ 6 đến 18 ký tự.";
    } else if (!emailPattern.test(email)) {
        errorDiv.textContent = "Email không đúng định dạng.";
    } else if (password.length < 6 || password.length > 18) {
        errorDiv.textContent = "Mật khẩu phải từ 6 đến 18 ký tự.";
    } else if (password !== confirmPassword) {
        errorDiv.textContent = "Xác nhận mật khẩu không khớp.";
    } else {
        errorDiv.textContent = "";

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const existUser = users.find(u => u.username === username);
        if (existUser) {
            errorDiv.textContent = "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.";
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Đăng ký thành công! Chuyển sang đăng nhập.");
        window.location.href = "login.html";
    }
});


// Toggle hiện/ẩn mật khẩu
document.addEventListener("DOMContentLoaded", function () {
    const toggleIcons = document.querySelectorAll(".toggle-password");
    toggleIcons.forEach(icon => {
        const input = document.getElementById(icon.dataset.target);
        icon.addEventListener("mousedown", () => {
            input.type = "text";
            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");
        });
        ["mouseup", "mouseleave"].forEach(evt => {
            icon.addEventListener(evt, () => {
                input.type = "password";
                icon.classList.remove("bi-eye-slash");
                icon.classList.add("bi-eye");
            });
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    if (!form) return;
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let users = JSON.parse(localStorage.getItem("users")) || [];

        let newUser = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        if (users.some(u => u.username === newUser.username)) {
            alert("Tên tài khoản đã tồn tại!");
            return;
        }

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công!");
    });
});
