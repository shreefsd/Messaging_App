const socket = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL

const currentUser = {
  id: Math.random().toString(36).substr(2, 9),
  name: "User" + Math.floor(Math.random() * 100), // Random name for demo
};

socket.onopen = () => {
  console.log('WebSocket connection established.');
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  displayMessage(message);
};

// Function to display messages in the chat box
function displayMessage(message) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.textContent = `${message.sender}: ${message.body}`;
  messageDiv.classList.add("message");
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat
}

// Function to send a message
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message !== "") {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.textContent = `${currentUser.name}: ${message}`;
    messageDiv.classList.add("sent-message");
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat

    // Send the message to the WebSocket server
    socket.send(JSON.stringify({ sender: currentUser.name, body: message }));

    messageInput.value = ""; // Clear the input after sending the message
  }
}

// Listen for Enter key press to send the message
document.getElementById("message-input").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
