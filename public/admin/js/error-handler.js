function handleSessionTimeout() {
    localStorage.clear();
    window.location.href = 'admin-login.html?error=session_expired';
}
