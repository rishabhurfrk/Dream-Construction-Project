// Settings management
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
});

// Load saved settings
function loadSettings() {
    // Load settings from localStorage or default values
    const settings = JSON.parse(localStorage.getItem('adminSettings')) || getDefaultSettings();
    populateSettingsForm(settings);
}

// Get default settings
function getDefaultSettings() {
    return {
        profile: {
            adminName: 'Admin User',
            email: 'admin@example.com'
        },
        website: {
            title: 'DREAM Construction',
            contactEmail: 'contact@example.com',
            phoneNumber: '+1234567890',
            address: '123 Construction Street, City, Country'
        },
        social: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
        }
    };
}

// Populate settings forms
function populateSettingsForm(settings) {
    // Profile settings
    document.querySelector('[name="adminName"]').value = settings.profile.adminName;
    document.querySelector('[name="email"]').value = settings.profile.email;

    // Website settings
    document.querySelector('[name="websiteTitle"]').value = settings.website.title;
    document.querySelector('[name="contactEmail"]').value = settings.website.contactEmail;
    document.querySelector('[name="phoneNumber"]').value = settings.website.phoneNumber;
    document.querySelector('[name="address"]').value = settings.website.address;

    // Social media settings
    document.querySelector('[name="facebook"]').value = settings.social.facebook;
    document.querySelector('[name="twitter"]').value = settings.social.twitter;
    document.querySelector('[name="instagram"]').value = settings.social.instagram;
    document.querySelector('[name="linkedin"]').value = settings.social.linkedin;
}

// Update profile
async function updateProfile(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        // Update profile logic here
        const settings = JSON.parse(localStorage.getItem('adminSettings')) || getDefaultSettings();
        settings.profile = {
            adminName: formData.get('adminName'),
            email: formData.get('email')
        };
        localStorage.setItem('adminSettings', JSON.stringify(settings));
        showNotification('Profile updated successfully', 'success');
    } catch (error) {
        showNotification('Error updating profile', 'error');
    }
}

// Update password
async function updatePassword(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }

    try {
        // Password update logic here
        // In production, this should make an API call to update the password
        showNotification('Password updated successfully', 'success');
        form.reset();
    } catch (error) {
        showNotification('Error updating password', 'error');
    }
}

// Update website settings
async function updateWebsiteSettings(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        const settings = JSON.parse(localStorage.getItem('adminSettings')) || getDefaultSettings();
        settings.website = {
            title: formData.get('websiteTitle'),
            contactEmail: formData.get('contactEmail'),
            phoneNumber: formData.get('phoneNumber'),
            address: formData.get('address')
        };
        localStorage.setItem('adminSettings', JSON.stringify(settings));
        showNotification('Website settings updated successfully', 'success');
    } catch (error) {
        showNotification('Error updating website settings', 'error');
    }
}

// Update social links
async function updateSocialLinks(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        const settings = JSON.parse(localStorage.getItem('adminSettings')) || getDefaultSettings();
        settings.social = {
            facebook: formData.get('facebook'),
            twitter: formData.get('twitter'),
            instagram: formData.get('instagram'),
            linkedin: formData.get('linkedin')
        };
        localStorage.setItem('adminSettings', JSON.stringify(settings));
        showNotification('Social links updated successfully', 'success');
    } catch (error) {
        showNotification('Error updating social links', 'error');
    }
}

// Create backup
function createBackup() {
    try {
        const settings = JSON.parse(localStorage.getItem('adminSettings')) || getDefaultSettings();
        const backupData = {
            settings: settings,
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup-${new Date().toISOString()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showNotification('Backup created successfully', 'success');
    } catch (error) {
        showNotification('Error creating backup', 'error');
    }
}

// Restore from backup
function restoreFromBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const backupData = JSON.parse(e.target.result);
            localStorage.setItem('adminSettings', JSON.stringify(backupData.settings));
            loadSettings();
            showNotification('Settings restored successfully', 'success');
        } catch (error) {
            showNotification('Error restoring from backup', 'error');
        }
    };
    reader.readAsText(file);
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
