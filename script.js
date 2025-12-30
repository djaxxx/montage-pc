/**
 * PORTFOLIO PC SUR MESURE - OPTIMIZED JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavigation();
    initScrollEffects();
    initObservers();
    initParticles();
    initBackToTop();
});

/* === PRELOADER === */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

/* === NAVIGATION === */
function initNavigation() {
    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Offset logic for better sticky header handling
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Only highlight if we have a current section and the link points to it
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/* === SCROLL EFFECTS === */
function initScrollEffects() {
    // Smooth Scroll for Anchor Links (Polyfill-like behavior if needed, generally CSS is enough)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* === OBSERVERS (Animations) === */
function initObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to elements
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .section-title, .contact-card');

    animatedElements.forEach((el, index) => {
        // Simple staged animation delay
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.5, 0, 0, 1) ${index % 3 * 0.1}s`;
        fadeObserver.observe(el);
    });
}

/* === PARTICLES === */
function initParticles() {
    let lastTime = 0;
    const interval = 50; // Throttle particle creation (ms)

    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastTime < interval) return;
        lastTime = currentTime;

        createParticle(e.clientX, e.clientY);
    }, { passive: true });
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';

    // Random direction
    const tx = (Math.random() - 0.5) * 50;
    const ty = (Math.random() - 0.5) * 50;

    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    document.body.appendChild(particle);

    // Auto remove
    setTimeout(() => {
        particle.remove();
    }, 800);
}

/* === BACK TO TOP === */
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');

    if (btn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}