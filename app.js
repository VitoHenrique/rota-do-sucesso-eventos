/**
 * Lybor Landgraf Website Logic
 * Includes Form Validation, Mobile Menu, Sticky Navigation, and Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DYNAMIC COPYRIGHT YEAR ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- STICKY NAV ON SCROLL ---
    const header = document.getElementById('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    // --- MOBILE MENU TOGGLE ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && 
                !navMenu.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        navMenu.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }

    function closeMobileMenu() {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore background scroll
    }

    // --- ACTIVE SECTION HIGHLIGHT ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    const activeLinkOnScroll = () => {
        const scrollY = window.scrollY + 120; // Offset for header

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    };
    window.addEventListener('scroll', activeLinkOnScroll);
    activeLinkOnScroll(); // Run once on startup

    // --- TOAST NOTIFICATIONS ---
    const toastContainer = document.getElementById('toast-container');
    
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Success SVG Icon
        const iconHtml = `
            <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
        `;
        
        toast.innerHTML = `
            ${iconHtml}
            <span class="toast-message">${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto-remove after 4.5 seconds
        setTimeout(() => {
            toast.style.animation = 'toastOut 350ms cubic-bezier(0.23, 1, 0.32, 1) forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 4500);
    }

    // Append toastOut animation keyframes dynamically if not present
    if (!document.getElementById('toast-anim-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-anim-styles';
        style.textContent = `
            @keyframes toastOut {
                to {
                    transform: translateY(-20px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // --- CONTACT FORM VALIDATION & SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const phoneInput = document.getElementById('form-phone');
        const messageInput = document.getElementById('form-message');

        const inputs = [nameInput, emailInput, phoneInput, messageInput];

        // Realtime validation feedback - remove error on input/change
        inputs.forEach(input => {
            if (input) {
                const handler = () => {
                    const group = input.closest('.form-group');
                    if (group) group.classList.remove('invalid');
                };
                input.addEventListener('input', handler);
                input.addEventListener('change', handler);
            }
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            // 1. Validate Name (Not empty)
            if (!nameInput.value.trim()) {
                nameInput.closest('.form-group').classList.add('invalid');
                isFormValid = false;
            } else {
                nameInput.closest('.form-group').classList.remove('invalid');
            }

            // 2. Validate Email (Format check)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.closest('.form-group').classList.add('invalid');
                isFormValid = false;
            } else {
                emailInput.closest('.form-group').classList.remove('invalid');
            }

            // 3. Validate Phone (Not empty)
            if (!phoneInput.value.trim()) {
                phoneInput.closest('.form-group').classList.add('invalid');
                isFormValid = false;
            } else {
                phoneInput.closest('.form-group').classList.remove('invalid');
            }

            // 4. Validate Message (Not empty)
            if (!messageInput.value.trim()) {
                messageInput.closest('.form-group').classList.add('invalid');
                isFormValid = false;
            } else {
                messageInput.closest('.form-group').classList.remove('invalid');
            }

            // If all fields are valid, submit form
            if (isFormValid) {
                // Mock endpoint/success state
                showToast("Mensagem enviada com sucesso! Entraremos em contato em breve.");
                contactForm.reset();
            }
        });
    }
});
