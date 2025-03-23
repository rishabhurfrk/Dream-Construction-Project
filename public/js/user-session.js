// user-session.js
document.addEventListener('DOMContentLoaded', function() {
    checkUserSession();
});

function checkUserSession() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    updateNavigation(isLoggedIn, userData);

    const currentPath = window.location.pathname;
    
    // Define protected pages for each role
    const customerPages = ['/getplans.html'];
    const architectPages = ['/architect-upload.html'];

    if (isLoggedIn) {
        // Check if architect is trying to access customer pages
        if (userData.role === 'architect' && customerPages.includes(currentPath)) {
            window.location.href = '/architect-upload.html';
            return;
        }
        
        // Check if customer is trying to access architect pages
        if (userData.role === 'customer' && architectPages.includes(currentPath)) {
            window.location.href = '/getplans.html';
            return;
        }
    } else {
        // If not logged in and trying to access any protected page
        if ([...customerPages, ...architectPages].includes(currentPath)) {
            window.location.href = '/login.html';
        }
    }
}

function updateNavigation(isLoggedIn, userData) {
    const nav = document.querySelector('.navbar .flex');
    if (!nav) return;

    nav.innerHTML = ''; // Clear existing nav items

    if (isLoggedIn && userData) {
        const userMenuItem = document.createElement('li');
        userMenuItem.className = 'user-menu';
        userMenuItem.innerHTML = `
            <div class="user-dropdown">
                <span>${userData.name || userData.email}</span>
                <a href="#" onclick="handleLogout(event)">Logout</a>
            </div>
        `;
        nav.appendChild(userMenuItem);
    } else {
        // Add login and signup links if user is not logged in
        nav.innerHTML = `
            <a href="login.html" class="hover:text-orange-400">Login</a>
            <a href="signup.html" class="hover:text-orange-400">Signup</a>
        `;
    }
}

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userData');
    window.location.href = '/login.html';
}
