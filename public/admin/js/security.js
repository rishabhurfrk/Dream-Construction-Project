// Add this to your admin pages
const securityMiddleware = {
    init: function() {
        // Check for admin session
        this.checkAuth();
        
        // Add security headers
        this.addSecurityHeaders();
        
        // Start session timeout
        this.startSessionTimeout();
    },

    checkAuth: function() {
        if (!localStorage.getItem('adminLoggedIn')) {
            window.location.href = 'login.html';
        }
    },

    addSecurityHeaders: function() {
        // In production, these should be set server-side
        document.getElementsByTagName('head')[0].innerHTML += `
            <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
            <meta http-equiv="X-Frame-Options" content="DENY">
            <meta http-equiv="X-XSS-Protection" content="1; mode=block">
        `;
    },

    startSessionTimeout: function() {
        // Auto logout after 30 minutes of inactivity
        let timeout;
        
        function resetTimeout() {
            clearTimeout(timeout);
            timeout = setTimeout(logout, 30 * 60 * 1000); // 30 minutes
        }

        // Reset timeout on user activity
        document.addEventListener('mousemove', resetTimeout);
        document.addEventListener('keypress', resetTimeout);
        
        resetTimeout();
    }
};

// Initialize security measures
securityMiddleware.init();
