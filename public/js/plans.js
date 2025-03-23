// Ensure variables are not redeclared
if (typeof scale === 'undefined') {
    var scale = 1;
    var rotation = 0;
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        plotLength: Number(document.getElementById('plot-length').value),
        plotWidth: Number(document.getElementById('plot-width').value)
    };

    console.log('Submitting form data:', formData); // Debug log

    fetch('/api/plans/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Received data:', data); // Debug log
        if (data && data.length > 0) {
            const plan = data[0];
            const zoomedImage = document.getElementById('zoomedImage');
            const imageModal = document.getElementById('imageModal');
            const modalTitle = document.querySelector('.modal-title');
            
            if (zoomedImage && imageModal && modalTitle) {
                zoomedImage.src = plan.imageUrl; // Remove the localhost prefix
                modalTitle.textContent = plan.name;
                imageModal.style.display = 'flex';
                resetZoom();
            } else {
                console.error('Modal elements not found:', {
                    zoomedImage: !!zoomedImage,
                    imageModal: !!imageModal,
                    modalTitle: !!modalTitle
                });
            }
        } else {
            alert('No matching plans found for these dimensions.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error searching for plans. Please try again.');
    });
}

function closeModal() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.style.display = 'none';
        resetZoom();
    }
}

function zoomIn() {
    scale = Math.min(3, scale + 0.2);
    updateTransform();
}

function zoomOut() {
    scale = Math.max(0.5, scale - 0.2);
    updateTransform();
}

function resetZoom() {
    scale = 1;
    rotation = 0;
    updateTransform();
}

function rotateImage() {
    rotation += 90;
    updateTransform();
}

function updateTransform() {
    const zoomedImage = document.getElementById('zoomedImage');
    if (zoomedImage) {
        zoomedImage.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    }
}

function downloadImage() {
    const zoomedImage = document.getElementById('zoomedImage');
    if (zoomedImage && zoomedImage.src) {
        const link = document.createElement('a');
        link.href = zoomedImage.src;
        link.download = 'house-plan.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    const imageModal = document.getElementById('imageModal');
    if (imageModal && imageModal.style.display === 'flex') {
        switch(e.key) {
            case '+':
            case '=':
                zoomIn();
                break;
            case '-':
                zoomOut();
                break;
            case 'r':
                rotateImage();
                break;
            case 'Escape':
                closeModal();
                break;
        }
    }
});
