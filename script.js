// Navigation smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
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

// Animate elements on scroll
document.querySelectorAll('.service-card, .gallery-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulation d'envoi
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = 'Message envoyé !';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Lazy loading des images
const images = document.querySelectorAll('.gallery-image img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Compteur animé (si vous ajoutez des statistiques)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Active le compteur quand la section devient visible
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Effet de typing sur le titre hero (optionnel)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Activer au chargement si vous voulez l'effet typing
// const heroTitle = document.querySelector('.hero-title .title-line:first-child');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 80);
// }

// Détection de la section active dans la navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Bouton "Retour en haut" (si vous l'ajoutez dans le HTML)
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Lightbox simple pour les images
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        
        // Créer le lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-info">
                    <h3>${item.querySelector('.gallery-overlay h3').textContent}</h3>
                    <p>${item.querySelector('.gallery-overlay p').textContent}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Animation d'entrée
        setTimeout(() => lightbox.classList.add('active'), 10);
        
        // Fermeture
        const close = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        };
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', close);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) close();
        });
        
        // Fermer avec Escape
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                close();
                document.removeEventListener('keydown', escClose);
            }
        });
    });
});

// Effet de particules sur le curseur (optionnel - effet premium)
let particles = [];
const particleCount = 20;

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) { // Créer une particule 10% du temps
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    if (particles.length > particleCount) {
        const oldParticle = particles.shift();
        if (oldParticle && oldParticle.parentNode) {
            oldParticle.parentNode.removeChild(oldParticle);
        }
    }
    
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    particles.push(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        particles = particles.filter(p => p !== particle);
    }, 1000);
}

// Préloader pour les images
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Toggle mode sombre/clair
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    // Vérifier la préférence sauvegardée
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-mode', currentTheme === 'light');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

// Animation des statistiques (si vous ajoutez une section stats)
const stats = [
    { id: 'stat-builds', target: 50, suffix: '+' },
    { id: 'stat-clients', target: 40, suffix: '+' },
    { id: 'stat-satisfaction', target: 100, suffix: '%' }
];

stats.forEach(stat => {
    const element = document.getElementById(stat.id);
    if (element) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateValue(element, 0, stat.target, 2000, stat.suffix);
                observer.disconnect();
            }
        });
        observer.observe(element);
    }
});

function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Validation du formulaire en temps réel
const form = document.querySelector('.contact-form');
if (form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateInput(input);
            }
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Ce champ est requis';
    } else if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Email invalide';
        }
    } else if (input.type === 'tel' && value) {
        const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Numéro invalide';
        }
    }
    
    // Afficher/masquer l'erreur
    let errorElement = input.parentElement.querySelector('.error-message');
    
    if (!isValid) {
        input.classList.add('error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
    } else {
        input.classList.remove('error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    return isValid;
}

// Effet de glitch sur le logo au survol (optionnel)
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        logo.style.animation = 'glitch 0.3s ease-in-out';
    });
    
    logo.addEventListener('animationend', () => {
        logo.style.animation = '';
    });
}

// Détection du scroll pour animations progressives
let scrollTimeout;
window.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
    }, 100);
}, { passive: true });

// Performance: désactiver les animations pendant le scroll rapide
let lastScrollY = window.pageYOffset;
let ticking = false;

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Votre logique de scroll ici
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

console.log('🚀 Portfolio PC sur Mesure - Version 2.0 chargé avec succès!');