/* ── MAIN.JS — Homepage interactions ── */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Scroll Reveal (Intersection Observer) ───
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ─── Nav scroll effect ───
    const nav = document.getElementById('nav');
    const onScroll = () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ─── Reading progress bar ───
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener(
            'scroll',
            () => {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = window.scrollY / docHeight;
                progressBar.style.transform = `scaleX(${Math.min(scrolled, 1)})`;
            },
            { passive: true }
        );
    }

    // ─── Smooth scroll for anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const top = target.offsetTop - 80;
                window.scrollTo({ top, behavior: 'smooth' });

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const hamburger = document.getElementById('nav-hamburger');
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // ─── Mobile menu toggle ───
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // ─── Custom cursor ───
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        const renderCursor = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            requestAnimationFrame(renderCursor);
        };
        renderCursor();

        // Expand cursor on interactive elements
        document.querySelectorAll('a, button, .card, .portfolio-card').forEach((el) => {
            el.addEventListener('mouseenter', () => {
                dot.style.width = '12px';
                dot.style.height = '12px';
                ring.style.width = '48px';
                ring.style.height = '48px';
                ring.style.borderColor = 'var(--accent)';
            });
            el.addEventListener('mouseleave', () => {
                dot.style.width = '8px';
                dot.style.height = '8px';
                ring.style.width = '32px';
                ring.style.height = '32px';
                ring.style.borderColor = 'var(--accent-glow)';
            });
        });
    }

    // ─── Ticker duplicate for infinite scroll ───
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        const clone = ticker.innerHTML;
        ticker.innerHTML += clone;
    }
});
