/*const apiKey = "AIzaSyCkd_Hmyp0UOd9tJyS5AYW6ht07WkNkG2Q"; // Replace with your actual API key
const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const MAX_MESSAGES = 50; // Max messages in chat

async function sendMessage() {
    const userInputField = document.getElementById("user-input");
    const userInput = userInputField.value.trim();
    if (userInput === "") return;

    appendMessage("user", userInput);
    userInputField.value = ""; // Clear input field

    // Show typing dots and get the typing element reference
    const typingIndicator = showTypingIndicator();

    const requestData = {
        contents: [{ parts: [{ text: userInput }] }]
    };

    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        const botMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand.";

        // Wait 2 seconds before responding (simulating typing delay)
        setTimeout(() => {
            replaceTypingIndicator(typingIndicator, botMessage);
        }, 2000);
    } catch (error) {
        console.error("Error:", error);
        setTimeout(() => {
            replaceTypingIndicator(typingIndicator, "⚠️ Error: Could not connect to the chatbot.");
        }, 2000);
    }
}

// Show typing indicator and return the element reference
function showTypingIndicator() {
    const chatBox = document.getElementById("chat-box");
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing-indicator";
    typingDiv.classList.add("message", "bot-message");
    typingDiv.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingDiv; // Return the element for later replacement
}

// Replace typing indicator with bot's message
function replaceTypingIndicator(typingIndicator, message) {
    if (typingIndicator) {
        typingIndicator.innerHTML = message; // Replace dots with the response
    }
}

// Append message to chatbox
function appendMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerHTML = message;
    chatBox.appendChild(messageDiv);

    while (chatBox.children.length > MAX_MESSAGES) {
        chatBox.removeChild(chatBox.firstChild); // Remove oldest message
    }

    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}*/
const apiKey = "AIzaSyCkd_Hmyp0UOd9tJyS5AYW6ht07WkNkG2Q"; // Replace with your actual API key
const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// Max messages to display
const MAX_MESSAGES = 50;

// Function to send user message
async function sendMessage() {
    const userInputField = document.getElementById("user-input");
    const userInput = userInputField.value.trim();
    if (userInput === "") return;

    appendMessage("user", userInput);
    userInputField.value = ""; // Clear input field

    // Show typing indicator
    showTypingIndicator();

    const requestData = {
        contents: [{ parts: [{ text: userInput }] }]
    };

    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        const botMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand.";
        
        // Remove typing indicator before displaying bot response
        hideTypingIndicator();
        
        appendMessage("bot", botMessage);
    } catch (error) {
        console.error("Error:", error);
        hideTypingIndicator();
        appendMessage("bot", "⚠️ Error: Could not connect to the chatbot.");
    }
}

// Show typing dots
function showTypingIndicator() {
    const chatBox = document.getElementById("chat-box");
    const typingIndicator = document.createElement("div");
    typingIndicator.id = "typing-indicator";
    typingIndicator.classList.add("bot-message");
    typingIndicator.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
    
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Hide typing dots
function hideTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) typingIndicator.remove();
}

// Append message to chat
function appendMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerHTML = message;
    
    chatBox.appendChild(messageDiv);

    // Limit messages
    while (chatBox.children.length > MAX_MESSAGES) {
        chatBox.removeChild(chatBox.firstChild);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
