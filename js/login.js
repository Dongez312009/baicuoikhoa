document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const forgotContainer = document.getElementById("forgotContainer");
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const inputUsername = document.getElementById("login-username").value.trim();
        const inputPassword = document.getElementById("login-password").value;
        const errorDiv = document.getElementById("loginError");
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === inputUsername && u.password === inputPassword);
        if (user) {
            errorDiv.textContent = "";
            localStorage.setItem("currentUser", JSON.stringify(user));
            localStorage.setItem("loggedInUser", user.username); 
            alert("Đăng nhập thành công!");
            window.location.href = "final_internship.html";
        } else {
            errorDiv.textContent = "Tên đăng nhập hoặc mật khẩu không đúng.";
        }
    });
    // 🔹 Link quên mật khẩu
    const forgotLink = document.getElementById("forgotPasswordLink");
    if (forgotLink) {
        forgotLink.addEventListener("click", function (e) {
            e.preventDefault();
            forgotContainer.innerHTML = `
                <h5>Quên mật khẩu</h5>
                <input type="email" id="resetEmail" class="form-control mb-2" placeholder="Nhập email đã đăng ký">

                <div class="mb-2 position-relative">
                    <input type="password" id="resetNewPassword" class="form-control" placeholder="Mật khẩu mới">
                    <i class="bi bi-eye position-absolute top-50 end-0 translate-middle-y me-2 toggle-password" 
                       data-target="resetNewPassword" style="cursor:pointer;"></i>
                </div>

                <div class="mb-2 position-relative">
                    <input type="password" id="resetConfirmPassword" class="form-control" placeholder="Xác nhận mật khẩu mới">
                    <i class="bi bi-eye position-absolute top-50 end-0 translate-middle-y me-2 toggle-password" 
                       data-target="resetConfirmPassword" style="cursor:pointer;"></i>
                </div>

                <button class="btn btn-warning w-100" id="resetPasswordBtn">Đặt lại mật khẩu</button>
                <div id="resetError" class="text-danger mt-2"></div>
            `;
            // Gắn toggle mắt cho form quên mật khẩu
            attachTogglePassword();
            document.getElementById("resetPasswordBtn").addEventListener("click", function () {
                const email = document.getElementById("resetEmail").value.trim();
                const newPass = document.getElementById("resetNewPassword").value.trim();
                const confirmPass = document.getElementById("resetConfirmPassword").value.trim();
                const resetError = document.getElementById("resetError");
                let users = JSON.parse(localStorage.getItem("users")) || [];
                let targetUser = users.find(u => u.email === email);
                if (!targetUser) return resetError.textContent = "Không tìm thấy tài khoản với email này!";
                if (!newPass) return resetError.textContent = "Mật khẩu mới không được để trống!";
                if (newPass === targetUser.password) return resetError.textContent = "Mật khẩu mới không được trùng với mật khẩu cũ!";
                if (newPass !== confirmPass) return resetError.textContent = "Mật khẩu xác nhận không khớp!";
                // ✅ Cập nhật mật khẩu
                targetUser.password = newPass;
                users = users.map(u => u.email === email ? targetUser : u);
                localStorage.setItem("users", JSON.stringify(users));

                // Nếu user đang login = email này → update luôn currentUser
                let currentUser = JSON.parse(localStorage.getItem("currentUser"));
                if (currentUser && currentUser.email === email) {
                    currentUser.password = newPass;
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                }
                alert("Đặt lại mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới.");
                location.reload();
            });
        });
    }
});
// 🔹 Hàm gắn mắt 👁 cho input mật khẩu
function attachTogglePassword() {
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
}
// Toggle hiện/ẩn mật khẩu cho form đăng nhập ban đầu
document.addEventListener("DOMContentLoaded", attachTogglePassword);
