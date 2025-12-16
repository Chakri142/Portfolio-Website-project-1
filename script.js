/**
 * ====================================================================
 * ADVANCED PORTFOLIO SCRIPT
 * Author: G. Chakradhar
 * Description: Handles animations, interactions, Formspree, and Royal Alerts.
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU TOGGLE ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // --- 2. SCROLL REVEAL ANIMATION ---
    const observerOptions = { threshold: 0.1 };
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatables = document.querySelectorAll('.skill-card, .hero-content p, .section-title, .royal-blue-btn');
    animatables.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(el);
    });

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `.fade-in-up { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(styleSheet);


    // --- 3. CONTACT FORM HANDLING (FORMSPREE INTEGRATION) ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            // Loading State
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            const formData = new FormData(form);

            try {
                // YOUR FORMSPREE LINK
                const response = await fetch("https://formspree.io/f/xldqyedp", {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Success - Show Royal Alert
                    showRoyalAlert('✨ Message Sent Successfully! I will get back to you soon.');
                    form.reset();
                } else {
                    showRoyalAlert('Oops! There was a problem sending your message.');
                }
            } catch (error) {
                showRoyalAlert('Oops! Network error. Please check your connection.');
            } finally {
                btn.innerText = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }
        });
    }

    // --- 4. PARTICLES.JS & IMAGE ROTATION (Safe Check) ---
    if (document.getElementById('particles-js') && window.particlesJS) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80 },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.1, width: 1 },
                move: { enable: true, speed: 1.5 }
            }
        });
    }
    
    const img = document.getElementById('rotate-img');
    if (img) {
        img.addEventListener('click', () => {
            img.classList.remove('image-rotate');
            void img.offsetWidth; 
            img.classList.add('image-rotate');
        });
    }
});

// --- 5. ROYAL ALERT FUNCTIONS ---
function showRoyalAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const msgText = document.getElementById('alert-msg');
    
    if (alertBox && msgText) {
        msgText.innerText = message;
        alertBox.classList.add('active');
    } else {
        // Fallback if HTML is missing
        alert(message);
    }
}

function closeAlert() {
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
        alertBox.classList.remove('active');
    }
}

// --- 6. SKILLS TOGGLE ---
window.toggleSection = function(sectionId) {
    const animatorSection = document.getElementById('animator-section');
    const webDevSection = document.getElementById('webdev-section');
    const clickedSection = document.getElementById(sectionId);

    if (!clickedSection) return;

    const isOpen = clickedSection.style.display === 'block';

    if (animatorSection) animatorSection.style.display = 'none';
    if (webDevSection) webDevSection.style.display = 'none';

    if (!isOpen) {
        clickedSection.style.display = 'block';
        setTimeout(() => {
            clickedSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 10);
    }
};