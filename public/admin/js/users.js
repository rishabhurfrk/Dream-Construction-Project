// Sample user data (replace with actual database data)
let users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'customer',
        status: 'active'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'architect',
        status: 'active'
    }
];

// Initialize users page
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    updateUserStats();
});

// Load users into table
function loadUsers() {
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>
                <button class="btn btn-small" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Update user statistics
function updateUserStats() {
    document.getElementById('totalUsersCount').textContent = users.length;
    document.getElementById('activeUsersCount').textContent = 
        users.filter(user => user.status === 'active').length;
    document.getElementById('newUsersCount').textContent = 
        users.filter(user => {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            return new Date(user.createdAt) > oneMonthAgo;
        }).length;
}

// Filter users
function filterUsers() {
    const searchText = document.querySelector('.table-filters input').value.toLowerCase();
    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchText) ||
               user.email.toLowerCase().includes(searchText);
    });
    renderFilteredUsers(filteredUsers);
}

// Filter by role
function filterUserRole() {
    const role = document.querySelector('.table-filters select').value;
    const filteredUsers = role === 'all' 
        ? users 
        : users.filter(user => user.role === role);
    renderFilteredUsers(filteredUsers);
}

// Render filtered users
function renderFilteredUsers(filteredUsers) {
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';

    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>
                <button class="btn btn-small" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Modal functions
function openAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
}

function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = 'none';
}

// Handle adding new user
async function handleAddUser(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const newUser = {
        id: users.length + 1,
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        status: 'active',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    loadUsers();
    updateUserStats();
    closeAddUserModal();
    showNotification('User added successfully', 'success');
}

// Edit user
function editUser(userId) {
    // Implement edit functionality
    console.log('Edit user:', userId);
}

// Delete user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.id !== userId);
        loadUsers();
        updateUserStats();
        showNotification('User deleted successfully', 'success');
    }
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
