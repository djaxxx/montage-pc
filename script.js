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
    initCopyButtons();
});

/* === COPY BUTTONS === */
function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            }
        });
    });
}

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

/* === GESTION DES AVIS CLIENTS === */
// S'assure que le code s'exécute une fois le DOM chargé (déjà géré par le listener global, 
// mais on l'ajoute ici pour qu'il soit autonome si collé en fin de fichier)
(function initReviews() {
    const reviewsContainer = document.getElementById('reviews-container');

    // Vérifier si la variable reviews existe (chargée depuis reviews.js) et si le conteneur est présent
    if (typeof reviews !== 'undefined' && reviewsContainer) {
        // Vider le conteneur par sécurité (éviter les doublons si appel multiple)
        reviewsContainer.innerHTML = '';

        reviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';

            // Génération des étoiles
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

            card.innerHTML = `
                <div class="review-header">
                    <span class="reviewer-name">${review.name}</span>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-rating">${stars}</div>
                <p class="review-text">"${review.text}"</p>
                <div class="review-footer">
                    <div class="review-setup">Setup : ${review.setup}</div>
                </div>
            `;

            reviewsContainer.appendChild(card);
        });

        // Animation d'apparition des avis (Intersection Observer)
        const reviewCards = document.querySelectorAll('.review-card');
        const reviewObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100); // Délai en cascade
                    reviewObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        reviewCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            reviewObserver.observe(card);
        });
    }
})();

/* === EMAILJS CONFIGURATION === */
(function initContactForm() {
    // IMPORTANT : Remplace ces valeurs par les tiennes récupérées sur EmailJS
    // https://dashboard.emailjs.com/admin
    const PUBLIC_KEY = "3eSARy49jbmtaIXzR";  // ex: "user_xxxxxx"
    const SERVICE_ID = "service_syfh2la";  // ex: "service_xxxx"
    const TEMPLATE_ID = "template_8bo0w7n"; // ex: "template_xxxx"

    // Initialisation
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(PUBLIC_KEY);
        }
    } catch (e) {
        console.warn("EmailJS SDK not loaded");
        return;
    }

    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Feedback visuel "Envoi en cours..."
            const btn = form.querySelector('button[type="submit"]');
            const originalBtnText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            btn.disabled = true;
            statusMsg.textContent = "";
            statusMsg.className = "form-status";

            // Envoi via EmailJS
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
                .then(function () {
                    console.log('SUCCESS!');
                    statusMsg.textContent = "✅ Message envoyé avec succès ! Je vous réponds vite.";
                    statusMsg.classList.add('success');
                    form.reset();
                }, function (error) {
                    console.log('FAILED...', error);
                    statusMsg.textContent = "❌ Erreur lors de l'envoi. Veuillez réessayer ou m'envoyer un mail direct.";
                    statusMsg.classList.add('error');
                })
                .finally(() => {
                    // Rétablissement du bouton
                    btn.innerHTML = originalBtnText;
                    btn.disabled = false;
                });
        });
    }
})();