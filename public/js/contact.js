document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Implement form submission logic here (e.g., AJAX request)

            alert(`Message sent:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
        });
    }
});
