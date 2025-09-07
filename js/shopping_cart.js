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
        if (e.key === "Enter") sendMessage();A
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
// Lấy giỏ hàng từ localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
// Lưu giỏ hàng vào localStorage
function saveCartItems(cartItems) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
}
// Hiển thị giỏ hàng ra màn hình
function displayCart() {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartContainer.innerHTML = "";
    let total = 0;
    cartItems.forEach((item, index) => {
        total += item.price * item.quantity;
        const itemRow = document.createElement("div");
        itemRow.className = "list-group-item d-flex align-items-center justify-content-between flex-wrap gap-3";
        itemRow.innerHTML = `
          <div class="d-flex align-items-center gap-3">
            <img src="${item.image}" alt="${item.name}" width="80" height="80" class="rounded">
            <div>
              <h5 class="mb-1">${item.name}</h5>
              <p class="mb-1">Giá: ${item.price.toLocaleString()}đ</p>
              <div class="input-group input-group-sm">
                <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, -1)">-</button>
                <input type="text" class="form-control text-center" value="${item.quantity}" readonly style="max-width: 50px;">
                <button class="btn btn-outline-secondary" onclick="changeQuantity(${index}, 1)">+</button>
              </div>
            </div>
          </div>
          <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Xóa</button>
        `;
        cartContainer.appendChild(itemRow);
    });
    totalPriceElement.textContent = `Tổng tiền: ${total.toLocaleString()}đ`;
}
// Xóa sản phẩm theo index
function removeItem(index) {
    const cartItems = getCartItems();
    cartItems.splice(index, 1);
    saveCartItems(cartItems);
    displayCart();
}
// Tăng/giảm số lượng sản phẩm
function changeQuantity(index, delta) {
    const cartItems = getCartItems();
    cartItems[index].quantity += delta;
    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }
    saveCartItems(cartItems);
    displayCart();
}
// Khi trang tải xong thì hiển thị giỏ hàng
document.addEventListener("DOMContentLoaded", displayCart);
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
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = total;
}
updateCartCount();


function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-list");
    if (!container) return;
    container.innerHTML = cart.map((item,i) => `
        <li>
            <img src="${item.image}" width="50" />
            ${item.title} - ${item.price}$ 
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${i}, this.value)" />
            <button onclick="removeFromCart(${i})">Xóa</button>
        </li>
    `).join("");
}

function updateQuantity(i, qty) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[i].quantity = parseInt(qty);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeFromCart(i) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(i,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

document.addEventListener("DOMContentLoaded", loadCart);
