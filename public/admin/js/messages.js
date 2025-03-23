// Sample messages data
let messages = [
    {
        id: 1,
        sender: 'John Doe',
        email: 'john@example.com',
        subject: 'Construction Plan Inquiry',
        message: 'I would like to know more about your modern villa plans...',
        date: '2024-02-20T10:30:00',
        read: false
    },
    {
        id: 2,
        sender: 'Jane Smith',
        email: 'jane@example.com',
        subject: 'Project Update Request',
        message: 'Could you please provide an update on our ongoing project?',
        date: '2024-02-19T15:45:00',
        read: true
    }
];

// Initialize messages page
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();
    updateMessageStats();
});

// Load messages
function loadMessages() {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message-item ${message.read ? 'read' : 'unread'}`;
        messageElement.innerHTML = `
            <div class="message-checkbox">
                <input type="checkbox" value="${message.id}">
            </div>
            <div class="message-content" onclick="viewMessage(${message.id})">
                <div class="message-sender">${message.sender}</div>
                <div class="message-subject">${message.subject}</div>
                <div class="message-preview">${message.message.substring(0, 100)}...</div>
                <div class="message-date">${formatDate(message.date)}</div>
            </div>
            <div class="message-actions">
                <button class="btn btn-small" onclick="replyToMessage(${message.id})">
                    <i class="fas fa-reply"></i>
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteMessage(${message.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        messagesList.appendChild(messageElement);
    });
}

// Update message statistics
function updateMessageStats() {
    document.getElementById('totalMessages').textContent = messages.length;
    document.getElementById('unreadMessages').textContent = 
        messages.filter(message => !message.read).length;
    
    const today = new Date().toDateString();
    document.getElementById('todayMessages').textContent = 
        messages.filter(message => new Date(message.date).toDateString() === today).length;
}

// View message
function viewMessage(messageId) {
    const message = messages.find(m => m.id === messageId);
    if (message) {
        document.getElementById('messageSubject').textContent = message.subject;
        document.getElementById('messageSender').textContent = `From: ${message.sender} <${message.email}>`;
        document.getElementById('messageDate').textContent = formatDate(message.date);
        document.getElementById('messageBody').textContent = message.message;
        
        // Mark as read
        if (!message.read) {
            message.read = true;
            updateMessageStats();
            loadMessages();
        }
        
        document.getElementById('messageModal').style.display = 'block';
    }
}

// Format date
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
}

// Filter messages
function filterMessages() {
    const searchText = document.querySelector('.messages-filters input').value.toLowerCase();
    const filteredMessages = messages.filter(message => {
        return message.subject.toLowerCase().includes(searchText) ||
               message.sender.toLowerCase().includes(searchText) ||
               message.message.toLowerCase().includes(searchText);
    });
    renderFilteredMessages(filteredMessages);
}

// Filter by message type
function filterMessageType() {
    const type = document.querySelector('.messages-filters select').value;
    let filteredMessages;
    switch(type) {
        case 'unread':
            filteredMessages = messages.filter(message => !message.read);
            break;
        case 'read':
            filteredMessages = messages.filter(message => message.read);
            break;
        default:
            filteredMessages = messages;
    }
    renderFilteredMessages(filteredMessages);
}

// Mark all as read
function markAllAsRead() {
    messages.forEach(message => message.read = true);
    loadMessages();
    updateMessageStats();
    showNotification('All messages marked as read', 'success');
}

// Delete selected messages
function deleteSelected() {
    const selectedIds = Array.from(document.querySelectorAll('.message-checkbox input:checked'))
        .map(checkbox => parseInt(checkbox.value));
    
    if (selectedIds.length === 0) {
        showNotification('No messages selected', 'error');
        return;
    }

    if (confirm(`Delete ${selectedIds.length} selected messages?`)) {
        messages = messages.filter(message => !selectedIds.includes(message.id));
        loadMessages();
        updateMessageStats();
        showNotification('Selected messages deleted', 'success');
    }
}

// Reply to message
function replyToMessage(messageId) {
    const message = messages.find(m => m.id === messageId);
    if (message) {
        // Implement reply functionality
        console.log('Reply to:', message);
    }
}

// Close message modal
function closeMessageModal() {
    document.getElementById('messageModal').style.display = 'none';
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
