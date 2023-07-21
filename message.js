// Fetch messages from the API
async function fetchMessages() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const messages = await response.json();
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }
  
  // Function to display messages in the chat box
  async function displayMessages() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = ""; // Clear the chat box before updating messages
  
    const messages = await fetchMessages();
  
    messages.forEach(message => {
      const messageDiv = document.createElement("div");
      messageDiv.textContent = message.body;
  
      if (message.userId === currentUser.id) {
        messageDiv.classList.add("sent-message");
      } else {
        messageDiv.classList.add("received-message");
      }
  
      chatBox.appendChild(messageDiv);
    });
  
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat
  }
  
  // Function to send a message
  function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();
  
    if (message !== "") {
      // Simulate sending the message by directly adding it to the chat box
      const chatBox = document.getElementById("chat-box");
      const messageDiv = document.createElement("div");
      messageDiv.textContent = message;
      messageDiv.classList.add("sent-message");
      chatBox.appendChild(messageDiv);
  
      messageInput.value = ""; // Clear the input after sending the message
      chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat
    }
  }
  
  // Listen for Enter key press to send the message
  document.getElementById("message-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
  
  // On page load, fetch and display messages
  displayMessages();
  