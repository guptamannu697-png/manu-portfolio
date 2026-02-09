// ===================================
// MANU GUPTA - PORTFOLIO WEBSITE
// Interactive JavaScript
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================
    // MOBILE MENU TOGGLE
    // ==================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    
    // ==================
    // HEADER SCROLL EFFECT
    // ==================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ==================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    
    // ==================
    // CONTACT FORM HANDLING
    // ==================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Log to console (for testing)
            console.log('Form submitted:', formData);
            
            // Show alert (replace with actual form submission logic)
            alert(`Thank you, ${formData.name}! Your message has been received.\n\nNote: This is a static website. To make this form functional, integrate with:\n- Formspree (https://formspree.io)\n- EmailJS (https://www.emailjs.com)\n- Or your own backend API`);
            
            // Reset form
            contactForm.reset();
            
            /* 
            ===================================
            TO MAKE FORM FUNCTIONAL:
            ===================================
            
            Option 1: Formspree (Easiest)
            ------------------------------
            1. Go to https://formspree.io
            2. Create a free account
            3. Get your form endpoint
            4. Replace the form action:
               <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
            
            Option 2: EmailJS
            -----------------
            1. Sign up at https://www.emailjs.com
            2. Create email service and template
            3. Get your service ID, template ID, and public key
            4. Add EmailJS script to HTML:
               <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
            5. Use this code:
            
            emailjs.init('YOUR_PUBLIC_KEY');
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
                .then(function(response) {
                    alert('Message sent successfully!');
                }, function(error) {
                    alert('Failed to send message. Please try again.');
                });
            
            Option 3: Backend API
            --------------------
            Replace fetch URL with your backend endpoint:
            
            fetch('https://your-api.com/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Message sent successfully!');
                contactForm.reset();
            })
            .catch(error => {
                alert('Failed to send message. Please try again.');
            });
            */
        });
    }
    
    
    // ==================
    // LAZY LOADING IMAGES
    // ==================
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    
    // ==================
    // ANIMATE ON SCROLL
    // ==================
    const animateElements = document.querySelectorAll('.skill-card, .project-preview-card, .expertise-card, .achievement-card');
    
    if ('IntersectionObserver' in window) {
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    animateObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => animateObserver.observe(element));
    }
    
    
    // ==================
    // TYPING EFFECT (Optional - for hero title)
    // ==================
    const typingElement = document.querySelector('.hero-title .highlight');
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after 500ms
        setTimeout(typeWriter, 500);
    }
    
    
    // ==================
    // COPY EMAIL TO CLIPBOARD
    // ==================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                // Create temporary notification
                const notification = document.createElement('div');
                notification.textContent = 'Email copied to clipboard!';
                notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #00d4ff;
                    color: #0a0a0a;
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
            });
        });
    });
    
    
    // ==================
    // INITIALIZE
    // ==================
    console.log('✓ Portfolio website loaded successfully');
    console.log('📧 Contact: guptamannu697@gmail.com');
    console.log('📱 Phone: +91 8700046125');
    
});


// ==================
// IMAGE ERROR HANDLING
// ==================
document.addEventListener('DOMContentLoaded', function() {
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            // Create placeholder on error
            this.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#666666';
            this.style.fontSize = '14px';
            this.style.fontWeight = '500';
            
            // Add "Image Placeholder" text
            if (!this.alt) {
                this.alt = 'Image Placeholder';
            }
        });
    });
});