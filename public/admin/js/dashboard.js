// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    loadDashboardData();
    loadRecentActivity();
});

// Load dashboard data
async function loadDashboardData() {
    try {
        // Simulated data - replace with actual API calls
        const dashboardData = {
            totalUsers: 150,
            activePlans: 45,
            totalProjects: 78,
            newMessages: 12
        };

        // Update dashboard cards
        document.getElementById('totalUsers').textContent = dashboardData.totalUsers;
        document.getElementById('activePlans').textContent = dashboardData.activePlans;
        document.getElementById('totalProjects').textContent = dashboardData.totalProjects;
        document.getElementById('newMessages').textContent = dashboardData.newMessages;

    } catch (error) {
        showNotification('Error loading dashboard data', 'error');
    }
}

// Load recent activity
function loadRecentActivity() {
    const activityLog = document.getElementById('activityLog');
    
    // Simulated activity data - replace with actual data from your backend
    const recentActivities = [
        {
            action: 'New User Registration',
            user: 'John Doe',
            date: '2024-02-20',
            status: 'Completed'
        },
        {
            action: 'Plan Upload',
            user: 'Architect Smith',
            date: '2024-02-19',
            status: 'Pending'
        },
        {
            action: 'Project Update',
            user: 'Manager Johnson',
            date: '2024-02-18',
            status: 'In Progress'
        }
    ];

    // Clear existing logs
    activityLog.innerHTML = '';

    // Add activity logs to table
    recentActivities.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${activity.action}</td>
            <td>${activity.user}</td>
            <td>${activity.date}</td>
            <td><span class="status-badge ${activity.status.toLowerCase().replace(' ', '-')}">${activity.status}</span></td>
        `;
        activityLog.appendChild(row);
    });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// If there's any redirect to login, update it
function checkSession() {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin-login.html';
    }
}
