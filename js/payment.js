function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = total;
}
updateCartCount();
document.addEventListener("DOMContentLoaded", function () {
    const chatbotContainer = document.getElementById("chatbot-container");
    const clostBtn = document.getElementById("close-btn");
    const sendBtn = document.getElementById("send-btn");
    const chatBotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotIcon = document.getElementById("chatbot-icon");
    chatbotIcon.addEventListener("click", () => {
        chatbotContainer.classList.remove("hidden");
        chatbotIcon.style.display = "none";
    });
    clostBtn.addEventListener("click", () => {
        chatbotContainer.classList.add("hidden");
        chatbotIcon.style.display = "flex";
    });
    sendBtn.addEventListener("click", sendMessage);
    chatBotInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});
function sendMessage() {
    const inputElement = document.getElementById("chatbot-input");
    const userMessage = inputElement.value.trim();
    if (userMessage) {
        appendMessage("user", userMessage);
        inputElement.value = ""; // Xóa nội dung đã nhập sau khi gửi
        getBotResponse(userMessage);
    }
}
function appendMessage(sender, message) {
    const messageContainer = document.getElementById("chatbot-messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
async function getBotResponse(userMessage) {
    const API_KEY = "AIzaSyDSpXFew6TicE5Er9oKqqmnQ9i2INg5jWE";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: userMessage }],
                    },
                ],
            }),
        });
        const data = await response.json();
        if (!data.candidates || !data.candidates.length) {
            throw new Error("No response from Gemini API");
        }
        const botMessage = data.candidates[0].content.parts[0].text;
        appendMessage("bot", botMessage);
    } catch (error) {
        console.error("Error:", error);
        appendMessage(
            "bot",
            "Sorry, I'm having trouble responding. Please try again."
        );
    }
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = total;
}
updateCartCount();
// Hiển thị tóm tắt đơn hàng
function loadOrderSummary() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryContainer = document.getElementById("order-summary");
    let total = 0;

    if (cartItems.length === 0) {
        summaryContainer.innerHTML = '<p>Không có sản phẩm nào trong giỏ hàng.</p>';
        document.getElementById("order-form").style.display = "none";
        return;
    }
    const list = document.createElement("ul");
    list.className = "list-group mb-3";

    cartItems.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${item.name} x ${item.quantity} <span>${(item.price * item.quantity).toLocaleString()}đ</span>`;
        list.appendChild(li);
    });
    const totalItem = document.createElement("li");
    totalItem.className = "list-group-item d-flex justify-content-between fw-bold";
    totalItem.innerHTML = `Tổng cộng <span>${total.toLocaleString()}đ</span>`;
    list.appendChild(totalItem);

    summaryContainer.appendChild(list);
}
// Xử lý đặt hàng
document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
    localStorage.removeItem("cart");
    window.location.href = "final_internship.html";
});
document.addEventListener("DOMContentLoaded", loadOrderSummary);
document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
        document.getElementById("usernameDisplay").textContent = username;
    }
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