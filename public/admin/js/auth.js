// Authentication check
function checkAuth() {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'admin-login.html';
        }
    }
}

// Logout function
function logout() {
    // Clear admin session
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    
    // Redirect to login page
    window.location.href = 'admin-login.html';
}

// Add to all admin pages
document.addEventListener('DOMContentLoaded', function() {
    // Only check auth on admin pages except login page
    if (!window.location.pathname.includes('admin-login.html')) {
        checkAuth();
    }
});

// Add this to your login.html
function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        // Store admin session
        localStorage.setItem('adminLoggedIn', 'true');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Show error message
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Invalid credentials';
        errorMessage.style.display = 'block';
    }
}
