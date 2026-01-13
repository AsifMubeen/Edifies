// ============================================
// LOADING BAR
// ============================================

const initLoadingBar = () => {
    const loadingContainer = document.querySelector('.loading-container');
    const loadingBar = document.querySelector('.loading-bar');
    
    if (!loadingBar) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 90) {
            progress += Math.random() * 40;
            loadingBar.style.width = progress + '%';
        }
    }, 200);
    
    const handleLoad = () => {
        clearInterval(interval);
        loadingBar.style.width = '100%';
        window.removeEventListener('load', handleLoad);
        
        setTimeout(() => {
            if (loadingContainer) {
                loadingContainer.classList.add('loaded');
            }
        }, 300);
    };
    
    window.addEventListener('load', handleLoad, { once: true });
};

document.addEventListener('DOMContentLoaded', initLoadingBar);

// ============================================
// SMOOTH SCROLL & NAVIGATION
// ============================================

const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                links.forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', initSmoothScroll);

// ============================================
// NAVIGATION ACTIVE STATE ON SCROLL
// ============================================

let scrollTicking = false;

const updateActiveNav = () => {
    const sections = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
    
    scrollTicking = false;
};

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(updateActiveNav);
        scrollTicking = true;
    }
}, { passive: true });

// ============================================
// WAVY SCROLL ANIMATION (Optimized)
// ============================================

let lastScrollY = 0;
let ticking = false;
const waves = document.querySelectorAll('.wave');

const updateWavePosition = () => {
    waves.forEach(wave => {
        wave.style.transform = `translateY(${lastScrollY * 0.3}px)`;
    });
    ticking = false;
};

const requestTick = () => {
    if (!ticking) {
        window.requestAnimationFrame(updateWavePosition);
        ticking = true;
    }
};

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    requestTick();
}, { passive: true });

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        const pageTop = page.offsetTop;
        const pageHeight = page.clientHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.pageYOffset;
        
        // Check if page is in viewport
        if (scrollY + windowHeight > pageTop && scrollY < pageTop + pageHeight) {
            const scrollPercent = (scrollY + windowHeight - pageTop) / (pageHeight + windowHeight);
            page.style.backgroundPosition = `0 ${scrollPercent * 50}px`;
        }
    });
}, { passive: true });

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const initObserver = () => {
    document.querySelectorAll('.about-card, .team-member').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', initObserver);

// ============================================
// HAMBURGER MENU
// ============================================

const initHamburgerMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger) return;
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
    initHamburgerMenu();
}

// ============================================
// FORM SUBMISSION
// ============================================

const initFormSubmission = () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const messageInput = contactForm.querySelector('textarea');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        if (name && email && message) {
            const submitBtn = contactForm.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 2000);
        } else {
            alert('Please fill in all fields');
        }
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormSubmission);
} else {
    initFormSubmission();
}

// ============================================
// GLOW EFFECT ON MOUSE MOVE (Optimized)
// ============================================

let mouseMoveTicking = false;

const updateGlowEffect = (e) => {
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    
    buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const distance = Math.sqrt(x ** 2 + y ** 2);
        
        if (distance < 150) {
            button.style.boxShadow = `0 0 ${20 + distance}px rgba(0, 212, 255, 0.4)`;
        } else {
            button.style.boxShadow = '';
        }
    });
    
    mouseMoveTicking = false;
};

document.addEventListener('mousemove', (e) => {
    if (!mouseMoveTicking) {
        window.requestAnimationFrame(() => updateGlowEffect(e));
        mouseMoveTicking = true;
    }
}, { passive: true });

// ============================================
// CTA BUTTON FUNCTIONALITY
// ============================================

const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// SMOOTH INITIALIZATION
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});
