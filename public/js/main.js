function handleAdminClick(event) {
    event.preventDefault();
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (isLoggedIn) {
        window.location.href = 'admin/dashboard.html';
    } else {
        window.location.href = 'admin/admin-login.html';
    }
}
