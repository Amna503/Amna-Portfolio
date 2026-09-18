// ========================================
// Navigation
// ========================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '-80px 0px 0px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// Typing Effect
// ========================================
(function() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    const phrases = [
        'Frontend Developer',
        'AI Enthusiast',
        'Generative AI Learner',
        'Agentic AI Developer',
        'SEO Specialist'
    ];

    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseAfterType = 2500;
    const pauseAfterDelete = 500;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Respect reduced motion: show first phrase statically
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        typedElement.textContent = phrases[0];
        return;
    }

    function tick() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            typedElement.textContent = current.substring(0, charIndex);
        } else {
            charIndex++;
            typedElement.textContent = current.substring(0, charIndex);
        }

        let delay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === current.length) {
            delay = pauseAfterType;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = pauseAfterDelete;
        }

        setTimeout(tick, delay);
    }

    setTimeout(tick, 800);
})();

// ========================================
// Scroll Reveal Animations
// ========================================
(function() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const animated = document.querySelectorAll('[data-animate]');
    if (!animated.length) return;

    // Grouped selectors that should stagger their children
    const staggerGroups = [
        '.skill-category',
        '.project-card',
        '.timeline-item',
        '.seo-skill-card',
        '.about-details .detail-item'
    ];

    // Assign stagger index to children inside grouped parents
    const processed = new Set();
    staggerGroups.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            if (el.hasAttribute('data-animate') && !processed.has(el)) {
                el.style.setProperty('--stagger-index', i);
                processed.add(el);
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    animated.forEach(el => observer.observe(el));
})();

// ========================================
// Hero Particles
// ========================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
}

createParticles();

// ========================================
// Contact Form
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const btn = this.querySelector('button');
        const originalText = btn.innerHTML;
        const formAction = this.getAttribute('action');

        if (!formAction || formAction.includes('YOUR_FORM_ID')) {
            btn.innerHTML = '<span>Please configure Formspree first</span>';
            btn.style.background = '#ef4444';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
            return;
        }

        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;

        try {
            const formData = new FormData(this);
            const response = await fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                btn.innerHTML = '<span>Message Sent!</span>';
                btn.style.background = '#22c55e';
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            btn.innerHTML = '<span>Failed - Try Email</span>';
            btn.style.background = '#ef4444';
        }

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
}

// ========================================
// Skill Tags Hover Effect
// ========================================
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ========================================
// Project Cards Stagger Animation
// ========================================
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => projectObserver.observe(card));

// ========================================
// Timeline Animation
// ========================================
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => timelineObserver.observe(item));

// ========================================
// Back to Top Button
// ========================================
(function() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
})();

// ========================================
// Keyboard Navigation Support
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ========================================
// Close mobile menu on outside click
// ========================================
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ========================================
// Custom Cursor
// ========================================
(function() {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    const glow = document.getElementById('cursorGlow');

    if (!cursor || !follower || !glow) return;

    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;
    let glowX = -100, glowY = -100;
    let isHovering = false;
    let rafId = null;
    let isVisible = false;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
            glow.classList.add('visible');
        }
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
        glow.classList.remove('visible');
        isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
        glow.classList.add('visible');
        isVisible = true;
    });

    // Interactive elements
    const interactiveSelectors = [
        'a', 'button', 'input', 'textarea', 'select', 'label',
        '.nav-toggle', '.social-link', '.project-btn',
        '.skill-tag', '.tool-tag', '.btn',
        '.project-card',
        '.skill-category', '.seo-skill-card'
    ].join(', ');

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelectors)) {
            isHovering = true;
            cursor.classList.add('hover');
            follower.classList.add('hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelectors)) {
            isHovering = false;
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        }
    });

    // Click animation
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.85)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Animation loop
    function animate() {
        // Cursor follows mouse instantly
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        // Follower lags behind with easing
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        // Glow trails even further behind
        glowX += (mouseX - glowX) * 0.06;
        glowY += (mouseY - glowY) * 0.06;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        rafId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup on page hide (performance)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(rafId);
        } else {
            animate();
        }
    });
})();

// ========================================
// Magnetic Button Interaction
// ========================================
(function() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const magneticElements = document.querySelectorAll('.btn, .project-btn');

    magneticElements.forEach(el => {
        el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        el.style.willChange = 'transform';

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            const strength = el.classList.contains('project-btn') ? 0.25 : 0.35;
            const moveX = deltaX * strength;
            const moveY = deltaY * strength;

            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
})();
