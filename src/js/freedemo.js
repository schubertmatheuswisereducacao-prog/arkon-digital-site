/* ── CSS Imports (order matters for cascade) ── */
import '../styles/variables.css';
import '../styles/reset.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/checkout.css'; // Reusing checkout styles
import '../styles/responsive.css';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('freedemo-form');
    if (!form) return;

    const fields = {
        business: {
            el: document.getElementById('field-business'),
            validate: (v) => v.trim().length >= 2,
            msg: 'Please enter your business name',
        },
        location: {
            el: document.getElementById('field-location'),
            validate: (v) => v.trim().length >= 2,
            msg: 'Please enter your city / state',
        },
        description: {
            el: document.getElementById('field-description'),
            validate: (v) => v.trim().length >= 5,
            msg: 'Please describe your business',
        },
        email: {
            el: document.getElementById('field-email'),
            validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            msg: 'Please enter a valid email',
        },
    };

    // Clear error on input
    Object.values(fields).forEach(({ el }) => {
        el.addEventListener('input', () => {
            el.classList.remove('error');
            const errorEl = el.nextElementSibling;
            if (errorEl && errorEl.classList.contains('form-error')) {
                errorEl.style.display = 'none';
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all required fields
        Object.entries(fields).forEach(([key, { el, validate, msg }]) => {
            const value = el.value;
            if (!validate(value)) {
                isValid = false;
                el.classList.add('error');
                const errorEl = el.nextElementSibling;
                if (errorEl && errorEl.classList.contains('form-error')) {
                    errorEl.textContent = msg;
                    errorEl.style.display = 'block';
                }
            } else {
                el.classList.remove('error');
            }
        });

        if (isValid) {
            // Show loading state
            const submitBtn = form.querySelector('.checkout-submit');
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Submitting...';

            // Simulate form submission
            setTimeout(() => {
                form.style.display = 'none';
                const successMsg = document.getElementById('freedemo-success');
                successMsg.style.display = 'flex';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 600);
        }
    });
});
