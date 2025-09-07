document.addEventListener("DOMContentLoaded", function () {
    const accountDiv = document.getElementById("accountInfo");
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        accountDiv.innerHTML = "<p>Bạn chưa đăng nhập. Vui lòng <a href='login.html'>đăng nhập</a>.</p>";
        document.getElementById("logoutBtn").style.display = "none";
        return;
    }
    accountDiv.innerHTML = `
        <p><strong>Tên đăng nhập:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Mật khẩu:</strong>
          <input type="password" id="accountPassword" value="${user.password}" readonly class="form-control d-inline-block w-auto">
          <i id="eyeIcon" class="bi bi-eye ms-2" style="cursor:pointer;"></i>
        </p>
    `;
    // 👁️ nhấn giữ icon để hiện mật khẩu
    const eyeIcon = document.getElementById("eyeIcon");
    const pwField = document.getElementById("accountPassword");
    eyeIcon.addEventListener("mousedown", () => pwField.type = "text");
    eyeIcon.addEventListener("mouseup", () => pwField.type = "password");
    eyeIcon.addEventListener("mouseleave", () => pwField.type = "password");
    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        showAlert("success", "Bạn đã đăng xuất.");
        setTimeout(() => window.location.href = "final_internship.html", 1500);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
        document.getElementById("welcomeUser").style.display = "block";
        document.getElementById("logoutBtn").style.display = "block";
        document.getElementById("authMenu").style.display = "none";
        document.getElementById("usernameDisplay").textContent = username;
    }
});
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = total;
}
updateCartCount();
/* ---------- HIỆN FORM ĐỔI THÔNG TIN ---------- */
function showUpdateForm(type) {
    const container = document.getElementById("updateForm");
    let formHTML = "";
    if (type === "username") {
        formHTML = `
          <h5>Đổi tên tài khoản</h5>
          <input type="text" id="oldUsername" class="form-control mb-2" placeholder="Tên tài khoản cũ">
          <input type="text" id="newUsername" class="form-control mb-2" placeholder="Tên tài khoản mới">
          <button class="btn btn-primary" onclick="updateInfo('username')">Lưu</button>
        `;
    }
    else if (type === "email") {
        formHTML = `
          <h5>Đổi email</h5>
          <input type="email" id="oldEmail" class="form-control mb-2" placeholder="Email cũ">
          <input type="email" id="newEmail" class="form-control mb-2" placeholder="Email mới">
          <button class="btn btn-primary" onclick="updateInfo('email')">Lưu</button>
        `;
    }
    else if (type === "password") {
        formHTML = `
          <h5>Đổi mật khẩu</h5>
          <div class="mb-2 position-relative">
            <input type="password" id="oldPassword" class="form-control" placeholder="Mật khẩu cũ">
            <i class="bi bi-eye position-absolute top-50 end-0 translate-middle-y me-2" 
               style="cursor:pointer;" 
               onmousedown="togglePassword('oldPassword', true)" 
               onmouseup="togglePassword('oldPassword', false)" 
               onmouseleave="togglePassword('oldPassword', false)"></i>
          </div>
          <div class="mb-2 position-relative">
            <input type="password" id="newPassword" class="form-control" placeholder="Mật khẩu mới">
            <i class="bi bi-eye position-absolute top-50 end-0 translate-middle-y me-2" 
               style="cursor:pointer;" 
               onmousedown="togglePassword('newPassword', true)" 
               onmouseup="togglePassword('newPassword', false)" 
               onmouseleave="togglePassword('newPassword', false)"></i>
          </div>
          <div class="mb-2 position-relative">
            <input type="password" id="confirmPassword" class="form-control" placeholder="Xác nhận mật khẩu mới">
            <i class="bi bi-eye position-absolute top-50 end-0 translate-middle-y me-2" 
               style="cursor:pointer;" 
               onmousedown="togglePassword('confirmPassword', true)" 
               onmouseup="togglePassword('confirmPassword', false)" 
               onmouseleave="togglePassword('confirmPassword', false)"></i>
          </div>
          <button class="btn btn-primary" onclick="updateInfo('password')">Lưu</button>
          <p class="mt-2"><a href="#" onclick="showUpdateForm('forgotPassword')" style="text-decoration:none; color:#dc3545;">Quên mật khẩu?</a></p>
        `;
    }
    else if (type === "forgotPassword") {
        formHTML = `
          <h5>Quên mật khẩu</h5>
          <input type="email" id="resetEmail" class="form-control mb-2" placeholder="Nhập email đã đăng ký">
          <div class="mb-2 position-relative">
            <input type="password" id="resetNewPassword" class="form-control" placeholder="Mật khẩu mới">
            <i class="bi bi-eye position-absolute top-50 end-0 translate-middle-y me-2" 
               style="cursor:pointer;" 
               onmousedown="togglePassword('resetNewPassword', true)" 
               onmouseup="togglePassword('resetNewPassword', false)" 
               onmouseleave="togglePassword('resetNewPassword', false)"></i>
          </div>
          <div class="mb-2 position-relative">
            <input type="password" id="resetConfirmPassword" class="form-control" placeholder="Xác nhận mật khẩu mới">
            <i class="bi bi-eye position-absolute top-50 end-0 translate-middle-y me-2" 
               style="cursor:pointer;" 
               onmousedown="togglePassword('resetConfirmPassword', true)" 
               onmouseup="togglePassword('resetConfirmPassword', false)" 
               onmouseleave="togglePassword('resetConfirmPassword', false)"></i>
          </div>
          <button class="btn btn-warning" onclick="updateInfo('forgotPassword')">Đặt lại mật khẩu</button>
        `;
    }
    container.innerHTML = formHTML;
}
/* ---------- TOGGLE PASSWORD (MẮT 👁️) ---------- */
function togglePassword(id, show) {
    const field = document.getElementById(id);
    if (field) field.type = show ? "text" : "password";
}

/* ---------- HÀM THÔNG BÁO BOOTSTRAP ---------- */
function showAlert(type, message) {
    const alertBox = document.getElementById("alertBox");
    const alertType = type === "success" ? "alert-success" : "alert-danger";

    alertBox.innerHTML = `
      <div class="alert ${alertType} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
}
/* ---------- CẬP NHẬT THÔNG TIN ---------- */
function updateInfo(type) {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (type === "username") {
        const oldUsername = document.getElementById("oldUsername").value.trim();
        const newUsername = document.getElementById("newUsername").value.trim();
        if (oldUsername !== user.username) return showAlert("error", "Tên tài khoản cũ không đúng!");
        if (!newUsername) return showAlert("error", "Tên mới không được để trống!");
        if (users.some(u => u.username === newUsername)) return showAlert("error", "Tên tài khoản đã tồn tại!");
        user.username = newUsername;
        localStorage.setItem("currentUser", JSON.stringify(user));
        users = users.map(u => u.email === user.email ? user : u);
    }
    if (type === "email") {
        const oldEmail = document.getElementById("oldEmail").value.trim();
        const newEmail = document.getElementById("newEmail").value.trim();
        if (oldEmail !== user.email) return showAlert("error", "Email cũ không đúng!");
        if (!newEmail) return showAlert("error", "Email mới không được để trống!");
        user.email = newEmail; // ❌ cho phép email trùng
        localStorage.setItem("currentUser", JSON.stringify(user));
        users = users.map(u => u.username === user.username ? user : u);
    }
    if (type === "password") {
        const oldPass = document.getElementById("oldPassword").value.trim();
        const newPass = document.getElementById("newPassword").value.trim();
        const confirmPass = document.getElementById("confirmPassword").value.trim();
        if (oldPass !== user.password) return showAlert("error", "Mật khẩu cũ không đúng!");
        if (!newPass) return showAlert("error", "Mật khẩu mới không được để trống!");
        if (newPass === oldPass) return showAlert("error", "Mật khẩu mới không được trùng mật khẩu cũ!");
        if (newPass !== confirmPass) return showAlert("error", "Mật khẩu xác nhận không khớp!");
        user.password = newPass;
        localStorage.setItem("currentUser", JSON.stringify(user));
        users = users.map(u => u.username === user.username ? user : u);
    }
    if (type === "forgotPassword") {
        const email = document.getElementById("resetEmail").value.trim();
        const newPass = document.getElementById("resetNewPassword").value.trim();
        const confirmPass = document.getElementById("resetConfirmPassword").value.trim();
        let targetUser = users.find(u => u.email === email);
        if (!targetUser) return showAlert("error", "Không tìm thấy tài khoản với email này!");
        if (!newPass) return showAlert("error", "Mật khẩu mới không được để trống!");
        if (newPass === targetUser.password) return showAlert("error", "Mật khẩu mới không được trùng với mật khẩu cũ!");
        if (newPass !== confirmPass) return showAlert("error", "Mật khẩu xác nhận không khớp!");
        targetUser.password = newPass;
        users = users.map(u => u.email === email ? targetUser : u);
        // Nếu user đang đăng nhập bằng email này → update luôn currentUser
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.email === email) {
            currentUser.password = newPass;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
    showAlert("success", "Cập nhật thông tin thành công!");
    setTimeout(() => location.reload(), 1500);
}
