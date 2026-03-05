/* ── CHECKOUT.JS — Form validation & Stripe redirect ── */

const STRIPE_LINK = 'https://buy.stripe.com/9B65kFdwy3VvgUhgOg8N200';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    const fields = {
        name: {
            el: document.getElementById('field-name'),
            validate: (v) => v.trim().length >= 2,
            msg: 'Please enter your name',
        },
        email: {
            el: document.getElementById('field-email'),
            validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            msg: 'Please enter a valid email',
        },
        phone: {
            el: document.getElementById('field-phone'),
            validate: (v) => v.trim().length >= 7,
            msg: 'Please enter your phone number',
        },
        business: {
            el: document.getElementById('field-business'),
            validate: (v) => v !== '',
            msg: 'Please select your business type',
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

        // Validate all fields
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
            submitBtn.textContent = 'Redirecting...';

            // Store form data locally
            const formData = {
                name: fields.name.el.value.trim(),
                email: fields.email.el.value.trim(),
                phone: fields.phone.el.value.trim(),
                business: fields.business.el.value,
                timestamp: new Date().toISOString(),
            };

            try {
                localStorage.setItem('arkon_checkout', JSON.stringify(formData));
            } catch (err) {
                // localStorage not available, continue anyway
            }

            // Redirect to Stripe after brief delay
            setTimeout(() => {
                window.location.href = STRIPE_LINK;
            }, 800);
        }
    });
});
