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
    // Cuộn xuống sau khi thêm tin nhắn
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
