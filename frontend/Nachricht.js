function saveMessage() {
    const messageTextarea = document.getElementById('message');
    const messageText = messageTextarea.value;

    if (messageText.trim() !== '') {
        const messagesContainer = document.getElementById('messages-container');

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = messageText;

        messagesContainer.appendChild(messageDiv);

        // Clear the textarea after saving the message
        messageTextarea.value = '';
    }
}
