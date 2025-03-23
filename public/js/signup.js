document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            try {
                const formData = new FormData();
                
                // Add common fields
                formData.append('name', document.getElementById('name').value);
                formData.append('email', document.getElementById('email').value);
                formData.append('phone', document.getElementById('phone').value);
                formData.append('password', document.getElementById('password').value);
                formData.append('role', document.getElementById('role').value);

                const role = document.getElementById('role').value;
                
                // Add architect-specific fields if role is architect
                if (role === 'architect') {
                    formData.append('experience', document.getElementById('experience').value);
                    formData.append('license', document.getElementById('license').value);
                    
                    // Add certificate file
                    const certificateFile = document.getElementById('certificate').files[0];
                    if (certificateFile) {
                        formData.append('certificate', certificateFile);
                    }
                    
                    // Add portfolio file if provided
                    const portfolioFile = document.getElementById('portfolio').files[0];
                    if (portfolioFile) {
                        formData.append('portfolio', portfolioFile);
                    }
                }

                const response = await fetch('/api/signup', {
                    method: 'POST',
                    body: formData // Don't set Content-Type header, let browser set it with boundary
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Signup failed');
                }

                const data = await response.json();
                
                if (data.success) {
                    showPopupMessage('Signup successful! Redirecting to login...', 'success');
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                } else {
                    showPopupMessage(data.message || 'An error occurred during signup', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showPopupMessage(error.message || 'An error occurred during signup', 'error');
            }
        });
    }
});

function switchRole(role) {
    const buttons = document.querySelectorAll('.role-btn');
    const architectFields = document.getElementById('architectFields');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('role').value = role;
    
    if (role === 'architect') {
        architectFields.classList.add('active');
        // Make architect-specific fields required
        document.getElementById('experience').required = true;
        document.getElementById('license').required = true;
        document.getElementById('certificate').required = true;
    } else {
        architectFields.classList.remove('active');
        // Remove required attribute from architect-specific fields
        document.getElementById('experience').required = false;
        document.getElementById('license').required = false;
        document.getElementById('certificate').required = false;
    }
}

function showPopupMessage(message, type) {
    const popup = document.getElementById('popupMessage');
    if (!popup) {
        // Create popup if it doesn't exist
        const newPopup = document.createElement('div');
        newPopup.id = 'popupMessage';
        document.body.appendChild(newPopup);
        popup = newPopup;
    }
    
    popup.textContent = message;
    popup.className = `popup-message ${type}`;
    popup.style.display = 'block';

    // Hide the message after 3 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}