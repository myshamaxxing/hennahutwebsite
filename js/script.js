// Henna Hut Website JavaScript - Canva Design Version

document.addEventListener('DOMContentLoaded', function() {
    
    // Debug logo image loading
    const logoImages = document.querySelectorAll('.logo-image, .cta-logo-image');
    logoImages.forEach((img, index) => {
        console.log(`Logo image ${index + 1}:`, img.src);
        img.addEventListener('load', function() {
            console.log(`Logo image ${index + 1} loaded successfully`);
        });
        img.addEventListener('error', function() {
            console.error(`Logo image ${index + 1} failed to load:`, img.src);
        });
    });
    
    // Navigation buttons are now links, so no need for click handlers

    // CTA button is now a link, so no need for click handler

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const image = card.querySelector('.service-image img');
        const label = card.querySelector('.service-label');
        
        // Add hover effects to service images
        if (image) {
            card.addEventListener('mouseenter', function() {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                image.style.transform = 'scale(1)';
            });
        }
        
        // Service labels are now links, so no need for click handlers
    });

    // Form submission handling with custom dialog
    const forms = document.querySelectorAll('form[action*="formspree.io"]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formAction = form.getAttribute('action');
            
            // Show loading dialog
            showDialog('Sending your request...', 'loading');
            
            // Submit form data
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success dialog
                    showDialog('Thank you! Your request has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
                    // Clear the form
                    form.reset();
                } else {
                    // Show error dialog
                    showDialog('Sorry, there was an error sending your request. Please try again or contact me directly.', 'error');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showDialog('Sorry, there was an error sending your request. Please try again or contact me directly.', 'error');
            });
        });
    });

    // Dialog functions
    function showDialog(message, type) {
        // Remove existing dialog if any
        const existingDialog = document.querySelector('.custom-dialog');
        if (existingDialog) {
            existingDialog.remove();
        }
        
        // Create dialog
        const dialog = document.createElement('div');
        dialog.className = 'custom-dialog';
        dialog.innerHTML = `
            <div class="dialog-content">
                <div class="dialog-icon ${type}">${getIcon(type)}</div>
                <h3>${type === 'loading' ? 'Please Wait' : type === 'success' ? 'Success!' : 'Error'}</h3>
                <p>${message}</p>
                <button class="dialog-button" onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(dialog);
        
        // Auto-remove loading dialog after 3 seconds if it's still there
        if (type === 'loading') {
            setTimeout(() => {
                if (dialog.parentElement) {
                    dialog.remove();
                }
            }, 3000);
        }
    }
    
    function getIcon(type) {
        switch(type) {
            case 'loading': return '⏳';
            case 'success': return '✅';
            case 'error': return '❌';
            default: return '💬';
        }
    }

    console.log('Henna Hut Canva design loaded successfully! 🎨✨');
});
