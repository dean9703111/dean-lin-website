/* ============================================
   Dean Lin - Personal Website Script
   Mobile-first, performance-optimized
   ============================================ */

'use strict';

// ============================================
// Hamburger Menu (Mobile Navigation)
// ============================================
const initMobileMenu = () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const body = document.body;

    if (!hamburger || !navMenu) return;

    const openMenu = () => {
        hamburger.classList.add('is-active');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', '關閉選單');
        navMenu.classList.add('is-open');
        navOverlay.classList.add('is-active');
        body.classList.add('menu-open');
    };

    const closeMenu = () => {
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', '開啟選單');
        navMenu.classList.remove('is-open');
        navOverlay.classList.remove('is-active');
        body.classList.remove('menu-open');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('is-open');
        isOpen ? closeMenu() : openMenu();
    });

    // Close on overlay click
    navOverlay.addEventListener('click', closeMenu);

    // Close on nav link click (smooth scroll to section)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
            closeMenu();
            hamburger.focus();
        }
    });

    // Reset menu state on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    }, { passive: true });
};

// ============================================
// Smooth Scroll Navigation
// ============================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 68;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetTop, behavior: 'smooth' });
            }
        });
    });
};

// ============================================
// Active Navigation Link (Scroll Spy)
// ============================================
const initScrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 68;

    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 80;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
};

// ============================================
// Navbar Shadow on Scroll
// ============================================
const initNavbarEffect = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
        }
    }, { passive: true });
};

// ============================================
// Intersection Observer: Fade-in Animations
// ============================================
const initFadeAnimations = () => {
    const targets = document.querySelectorAll(
        '.expertise-card, .achievement-item, .course-card, .book-item, .gallery-item, .media-item'
    );

    if (!('IntersectionObserver' in window)) {
        // Fallback: show all immediately
        targets.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Staggered delay for grid items
                const delay = (entry.target.dataset.index || 0) * 80;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    });

    targets.forEach((el, i) => {
        el.classList.add('fade-in-up');
        el.dataset.index = i % 4; // Reset stagger per row
        observer.observe(el);
    });
};

// ============================================
// Achievement Counter Animation
// ============================================
const initCounterAnimation = () => {
    const achievementSection = document.querySelector('.achievements');
    if (!achievementSection) return;

    let animated = false;

    const animateCounter = (element, target, duration = 1800) => {
        let start = 0;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            element.textContent = current + '+';
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + '+';
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                document.querySelectorAll('.achievement-number').forEach(el => {
                    const target = parseInt(el.dataset.target || el.textContent);
                    animateCounter(el, target);
                });
            }
        });
    }, { threshold: 0.3 });

    observer.observe(achievementSection);
};

// ============================================
// Scroll to Top Button
// ============================================
const initScrollToTop = () => {
    const btn = document.getElementById('scrollToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// ============================================
// Image Lazy Loading (native + polyfill)
// ============================================
const initLazyLoading = () => {
    // Native lazy loading is set in HTML via loading="lazy"
    // This adds a fade-in effect when images load
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.4s ease';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });

    // Eager images (hero) should be visible immediately
    document.querySelectorAll('img[loading="eager"]').forEach(img => {
        img.style.opacity = '1';
    });
};

// ============================================
// Books Horizontal Scroll Indicator (Mobile)
// ============================================
const initBooksScrollHint = () => {
    const wrapper = document.querySelector('.books-scroll-wrapper');
    if (!wrapper) return;

    // Only on mobile
    if (window.innerWidth > 768) return;

    // Add a subtle scroll indicator if content overflows
    if (wrapper.scrollWidth > wrapper.clientWidth) {
        wrapper.style.position = 'relative';
    }
};

// ============================================
// Gallery Touch Support (tap to show caption)
// ============================================
const initGalleryTouch = () => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (!isTouchDevice) return;

    // On touch devices, captions are always visible via CSS
    // Add tap-to-open lightbox effect (simple version)
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('p');
            if (!img) return;

            // Create simple lightbox
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed; inset: 0; z-index: 9999;
                background: rgba(0,0,0,0.92);
                display: flex; flex-direction: column;
                align-items: center; justify-content: center;
                padding: 1.5rem;
                animation: fadeIn 0.2s ease;
            `;

            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxImg.style.cssText = `
                max-width: 100%; max-height: 80vh;
                border-radius: 0.75rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                object-fit: contain;
            `;

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '✕';
            closeBtn.setAttribute('aria-label', '關閉');
            closeBtn.style.cssText = `
                position: absolute; top: 1rem; right: 1rem;
                background: rgba(255,255,255,0.15); border: none;
                color: white; font-size: 1.25rem; width: 44px; height: 44px;
                border-radius: 50%; cursor: pointer; display: flex;
                align-items: center; justify-content: center;
            `;

            if (caption) {
                const lightboxCaption = document.createElement('p');
                lightboxCaption.textContent = caption.textContent;
                lightboxCaption.style.cssText = `
                    color: rgba(255,255,255,0.9); margin-top: 1rem;
                    font-size: 1rem; font-weight: 600; text-align: center;
                `;
                overlay.appendChild(lightboxCaption);
            }

            overlay.appendChild(lightboxImg);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            const close = () => {
                overlay.remove();
                document.body.style.overflow = '';
            };

            closeBtn.addEventListener('click', close);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) close();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') close();
            }, { once: true });
        });
    });
};

// ============================================
// Hide scroll hint on scroll
// ============================================
const initScrollHint = () => {
    const hint = document.querySelector('.scroll-hint');
    if (!hint) return;

    const handler = () => {
        if (window.scrollY > 100) {
            hint.style.opacity = '0';
            hint.style.transition = 'opacity 0.5s ease';
            window.removeEventListener('scroll', handler);
        }
    };

    window.addEventListener('scroll', handler, { passive: true });
};

// ============================================
// Console Branding
// ============================================
const initConsoleBranding = () => {
    console.log('%c林鼎淵 (Dean Lin)', 'font-size:22px;color:#1e3a8a;font-weight:800;');
    console.log('%cAI 工作術專家 × 全端開發講師 × 暢銷作家', 'font-size:13px;color:#0ea5e9;');
    console.log('%c📧 babydragon9703111@gmail.com', 'font-size:11px;color:#6b7280;');
};

// ============================================
// Initialize All Modules
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initNavbarEffect();
    initFadeAnimations();
    initCounterAnimation();
    initScrollToTop();
    initLazyLoading();
    initBooksScrollHint();
    initGalleryTouch();
    initScrollHint();
    initConsoleBranding();
});
