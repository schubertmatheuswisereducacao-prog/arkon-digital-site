/* ── CSS Imports (order matters for cascade) ── */
import '../styles/variables.css';
import '../styles/reset.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/thankyou.css';
import '../styles/responsive.css';

import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
    /* ── CONFETTI EFFECT ── */
    const myCanvas = document.getElementById('confetti-canvas');
    if (myCanvas) {
        const myConfetti = confetti.create(myCanvas, {
            resize: true,
            useWorker: true
        });

        // Fire confetti from edges
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
});
