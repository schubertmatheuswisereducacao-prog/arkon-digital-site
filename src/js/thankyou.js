/* ── THANKYOU.JS — Confetti, Terms modal, & checkbox logic ── */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Confetti Canvas ───
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const colors = ['#e0ff00', '#ffffff', '#b8cc00', '#f0ff66', '#9aad00'];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -10 - Math.random() * canvas.height * 0.5;
                this.size = Math.random() * 6 + 3;
                this.speedY = Math.random() * 3 + 1.5;
                this.speedX = (Math.random() - 0.5) * 2;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 8;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = 1;
                this.decay = Math.random() * 0.005 + 0.002;
                this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
                this.opacity -= this.decay;
                this.speedX += (Math.random() - 0.5) * 0.1;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(this.opacity, 0);
                ctx.fillStyle = this.color;

                if (this.shape === 'rect') {
                    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            }
        }

        const createBurst = (count = 80) => {
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles = particles.filter((p) => p.opacity > 0 && p.y < canvas.height + 20);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            if (particles.length > 0) {
                animationId = requestAnimationFrame(animate);
            }
        };

        setTimeout(() => { createBurst(100); animate(); }, 300);
        setTimeout(() => { createBurst(60); if (!animationId) animate(); }, 1200);
    }

    // ─── Terms of Service Modal ───
    const modal = document.getElementById('terms-modal');
    const openTermsLinks = document.querySelectorAll('#open-terms, #terms-link');
    const closeBtn = document.getElementById('terms-modal-close');
    const closeOverlay = document.getElementById('terms-modal-close-overlay');

    const openModal = (e) => {
        e.preventDefault();
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    openTermsLinks.forEach((link) => link.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeOverlay) closeOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // ─── Terms Checkbox → Unlock Form Button ───
    const checkbox = document.getElementById('terms-checkbox');
    const formBtn = document.getElementById('form-btn');
    const hint = document.getElementById('terms-hint');

    if (checkbox && formBtn) {
        const updateBtn = () => {
            if (checkbox.checked) {
                formBtn.classList.add('enabled');
                formBtn.removeAttribute('aria-disabled');
                if (hint) hint.style.display = 'none';
            } else {
                formBtn.classList.remove('enabled');
                formBtn.setAttribute('aria-disabled', 'true');
                if (hint) hint.style.display = '';
            }
        };

        checkbox.addEventListener('change', updateBtn);

        formBtn.addEventListener('click', (e) => {
            if (!checkbox.checked) {
                e.preventDefault();
                if (hint) {
                    hint.style.display = 'block';
                    hint.classList.add('shake');
                    setTimeout(() => hint.classList.remove('shake'), 600);
                }
            }
        });
    }

    // ─── Footer Terms link (homepage) ───
    const footerTermsLink = document.getElementById('footer-terms-link');
    if (footerTermsLink && modal) {
        footerTermsLink.addEventListener('click', openModal);
    }
});
