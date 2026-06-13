// ===========================
// GLOBAL VARIABLES & CONFIG
// ===========================

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Typing effect texts
const typingTexts = [
    'Full Stack Developer',
    'AI/ML Enthusiast',
    'Software Engineer',
    'Problem Solver',
    'Code Enthusiast'
];

// ===========================
// TYPING EFFECT
// ===========================

class TypingEffect {
    constructor(elementId, texts, speed = 100, deletionSpeed = 50) {
        this.element = document.getElementById(elementId);
        this.texts = texts;
        this.speed = speed;
        this.deletionSpeed = deletionSpeed;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (!this.isDeleting) {
            // Typing mode
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;

            if (this.currentCharIndex === currentText.length) {
                // Text fully typed, wait then start deleting
                this.isDeleting = true;
                setTimeout(() => this.type(), 2000);
                return;
            }
        } else {
            // Deleting mode
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;

            if (this.currentCharIndex === 0) {
                // Text fully deleted, move to next text
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            }
        }

        const delay = this.isDeleting ? this.deletionSpeed : this.speed;
        setTimeout(() => this.type(), delay);
    }
}

// Initialize typing effect
const typing = new TypingEffect('typingText', typingTexts);

// ===========================
// THEME TOGGLE (DARK MODE)
// ===========================

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

themeToggle.addEventListener('click', toggleTheme);

// ===========================
// MOBILE MENU TOGGLE
// ===========================

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        hamburger.style.transform = 'rotate(90deg)';
    } else {
        hamburger.style.transform = 'rotate(0)';
    }
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
    }
});

// ===========================
// SMOOTH SCROLLING
// ===========================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - navbar.offsetHeight;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active nav link
            updateActiveLink(link.getAttribute('data-nav'));
        }
    });
});

// ===========================
// ACTIVE NAV LINK HIGHLIGHTING
// ===========================

function updateActiveLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    if (current) {
        updateActiveLink(current);
    }
});

// ===========================
// BACK TO TOP BUTTON
// ===========================

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// NAVBAR SHADOW ON SCROLL
// ===========================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-md)';
    }
});

// ===========================
// SCROLL ANIMATIONS WITH AOS
// ===========================

function initAOS() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 200
        });
    }
}

// ===========================
// FORM HANDLING
// ===========================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name') || 'Guest';
        const email = formData.get('email') || 'user@example.com';
        const message = formData.get('message') || 'No message provided';
        
        // Create mailto link
        const subject = `Portfolio Inquiry from ${name}`;
        const body = `Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
        
        // Open email client
        window.location.href = `mailto:lalitha2006bhavani@gmail.com?subject=${subject}&body=${body}`;
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            showNotification('Message prepared! Your email client is opening...');
        }, 500);
    });
}

// ===========================
// NOTIFICATIONS
// ===========================

function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #3B82F6, #8B5CF6);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        z-index: 2000;
        font-weight: 600;
        animation: slideDown 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `all 0.8s ease-out ${index * 0.1}s`;
        });

        window.addEventListener('scroll', () => this.reveal());
        // Initial check
        this.reveal();
    }

    reveal() {
        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;

            if (isVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.classList.add('aos-animate');
            }
        });
    }
}

// ===========================
// PARALLAX EFFECT
// ===========================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax') || 0.5;
            const yPos = window.scrollY * speed;
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===========================
// INTERSECTION OBSERVER FOR STATS
// ===========================

function initCountAnimation() {
    const stats = document.querySelectorAll('.stat h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.textContent;
                const numericValue = parseInt(finalValue);
                
                if (!isNaN(numericValue)) {
                    animateNumber(element, 0, numericValue, 2000);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = end > 999 ? 100 : 10;
    let current = start;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + '+';
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, stepTime);
}

// ===========================
// NAVBAR STICKY
// ===========================

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.position = 'fixed';
    }
});

// ===========================
// SMOOTH SCROLL BEHAVIOR POLYFILL
// ===========================

function smoothScrollPolyfill() {
    const isSupported = 'scrollBehavior' in document.documentElement.style;
    
    if (!isSupported) {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (!target) return;
                
                e.preventDefault();
                
                const targetPosition = target.offsetTop - 70;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                window.requestAnimationFrame(function animate(currentTime) {
                    if (start === null) start = currentTime;
                    const elapsed = currentTime - start;
                    const run = ease(elapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (elapsed < duration) {
                        window.requestAnimationFrame(animate);
                    }
                });
            });
        });
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// ===========================
// PROJECT CARD HOVER EFFECT
// ===========================

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===========================
// SKILL CARD ANIMATION
// ===========================

function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        card.style.animation = `slideInUp 0.6s ease-out ${index * 0.05}s backwards`;
    });
}

// ===========================
// INTERSECTION OBSERVER
// ===========================

function initIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
    }
    
    // Quick navigation with keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                // Could open a search/command palette
                break;
        }
    }
});

// ===========================
// COPY TO CLIPBOARD
// ===========================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(() => {
        showNotification('Failed to copy');
    });
}

// Add copy functionality to email link
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('contextmenu', (e) => {
        const email = emailLink.getAttribute('href').replace('mailto:', '');
        if (confirm('Copy email to clipboard?')) {
            e.preventDefault();
            copyToClipboard(email);
        }
    });
}

// ===========================
// SCROLL PERFORMANCE
// ===========================

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // All scroll listeners are RAF-controlled for better performance
            ticking = false;
        });
        ticking = true;
    }
});

// ===========================
// PRELOAD IMAGES
// ===========================

function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const source = img.src;
        if (source) {
            const preloadImg = new Image();
            preloadImg.src = source;
        }
    });
}

// ===========================
// INITIALIZE ALL
// ===========================

function initAll() {
    console.log('🚀 Portfolio initialized');
    
    // Initialize theme
    initTheme();
    
    // Initialize AOS
    initAOS();
    
    // Initialize animations
    new ScrollReveal();
    
    // Initialize parallax
    initParallax();
    
    // Initialize counter animations
    initCountAnimation();
    
    // Initialize project cards
    initProjectCards();
    
    // Initialize skill cards
    initSkillCards();
    
    // Initialize intersection observer
    initIntersectionObserver();
    
    // Initialize smooth scroll polyfill
    smoothScrollPolyfill();
    
    // Preload images
    preloadImages();
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

// ===========================
// ACCESSIBILITY
// ===========================

// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: white;
    padding: 8px;
    z-index: 100;
    text-decoration: none;
`;
document.body.insertBefore(skipLink, document.body.firstChild);

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

// ===========================
// ERROR LOGGING
// ===========================

window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===========================
// PERFORMANCE MONITORING
// ===========================

if ('PerformanceObserver' in window) {
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        });
        observer.observe({ entryTypes: ['measure'] });
    } catch (e) {
        // Performance API not supported
    }
}

// ===========================
// PAGE VISIBILITY API
// ===========================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});

// ===========================
// ADD CSS ANIMATIONS
// ===========================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

console.log('✨ All features initialized and ready!');
