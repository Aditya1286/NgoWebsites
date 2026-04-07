/* ============================================================
   HopeForward NGO — script.js
   ============================================================ */

/* ── Smooth Scroll ─────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const headerH = document.querySelector('.header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });

        // Close mobile menu if open
        closeMenu();
    });
});

/* ── Header Scroll Effect ──────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Hamburger / Mobile Menu ───────────────────────────── */
const hamburger    = document.getElementById('hamburger');
const navLinks     = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

mobileOverlay.addEventListener('click', closeMenu);

/* ── Stats Counter Animation ───────────────────────────── */
function animateCounter(el, target, duration = 1600) {
    const suffix = el.nextElementSibling; // the .stat-suffix span
    const start = performance.now();
    const startVal = 0;

    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startVal + (target - startVal) * ease);

        // Format with comma for thousands
        el.textContent = current >= 1000
            ? (current / 1000).toFixed(current % 1000 === 0 ? 0 : 1) + 'K'
            : current;

        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target >= 1000
            ? (target / 1000).toFixed(0) + 'K'
            : target;
    }
    requestAnimationFrame(step);
}

/* ── Intersection Observer — Stat items ────────────────── */
const statItems = document.querySelectorAll('.stat-item[data-animate]');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('visible');
            const numEl  = el.querySelector('.stat-number');
            const target = parseInt(numEl.dataset.target, 10);
            animateCounter(numEl, target);
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.25 });

statItems.forEach(item => statObserver.observe(item));

/* ── Donate Amounts ────────────────────────────────────── */
const amountBtns   = document.querySelectorAll('.amount-btn');
const customInput  = document.getElementById('customAmount');
let selectedAmount = 1000;

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAmount = parseInt(btn.dataset.amount, 10);
        customInput.value = '';
    });
});

customInput.addEventListener('input', () => {
    amountBtns.forEach(b => b.classList.remove('active'));
    selectedAmount = parseInt(customInput.value, 10) || 0;
});

document.getElementById('donateSubmit').addEventListener('click', () => {
    const amt = customInput.value ? parseInt(customInput.value, 10) : selectedAmount;
    if (!amt || amt < 1) {
        customInput.focus();
        customInput.style.borderColor = '#e74c3c';
        setTimeout(() => customInput.style.borderColor = '', 1500);
        return;
    }
    alert(`🙏 Thank you! You're about to donate ₹${amt.toLocaleString('en-IN')}.\nRedirecting to secure payment…`);
});

/* ── Contact Form ──────────────────────────────────────── */
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const form    = this;
    const success = document.getElementById('formSuccess');
    form.style.opacity = '0.4';
    form.style.pointerEvents = 'none';

    // Simulate async send
    setTimeout(() => {
        success.classList.add('show');
        form.reset();
        form.style.opacity = '';
        form.style.pointerEvents = '';
    }, 600);
});
