document.addEventListener('DOMContentLoaded', function() {
    // Check admin login status
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const dashboardLink = document.getElementById('dashboardLink');
    const logoutLink = document.getElementById('logoutLink');
    const loginLink = document.querySelector('.admin-dropdown-content a[href="admin/admin-login.html"]');

    // Update menu items based on login status
    if (isAdminLoggedIn) {
        dashboardLink.style.display = 'flex';
        logoutLink.style.display = 'flex';
        loginLink.style.display = 'none';
    } else {
        dashboardLink.style.display = 'none';
        logoutLink.style.display = 'none';
        loginLink.style.display = 'flex';
    }
});

// Handle logout
function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    window.location.href = 'index.html';
}
