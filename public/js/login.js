document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const activeRoleBtn = document.querySelector('.role-btn.active');
                const role = activeRoleBtn ? activeRoleBtn.textContent.toLowerCase() : 'customer';

                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        role
                    }),
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                
                if (result.success) {
                    localStorage.setItem('userLoggedIn', 'true');
                    localStorage.setItem('userData', JSON.stringify({
                        email: result.data.email,
                        name: result.data.name || result.data.email,
                        role: result.data.role
                    }));

                    showPopupMessage('Login successful! Redirecting...', 'success');
                    
                    if (result.data.role === 'architect') {
                        window.location.href = '/architect-upload.html';
                    } else if (result.data.role === 'customer') {
                        window.location.href = '/getplans.html';
                    }
                } else {
                    showPopupMessage(result.message || 'Invalid credentials', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showPopupMessage('An error occurred during login', 'error');
            }
        });
    }
});

function switchRole(role) {
    const buttons = document.querySelectorAll('.role-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === role.toLowerCase()) {
            btn.classList.add('active');
        }
    });

    const roleInput = document.getElementById('role');
    roleInput.value = role;
}

function showPopupMessage(message, type) {
    const popup = document.getElementById('popupMessage');
    popup.textContent = message;
    popup.className = `popup-message ${type}`;
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

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
