// ─── THEME TOGGLE ───
(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light');
})();

function syncToggles() {
  // both buttons reflect current state
}

document.addEventListener('DOMContentLoaded', () => {
  const btns = [
    document.getElementById('theme-toggle'),
    document.getElementById('theme-toggle-desktop')
  ];
  btns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  });
});

// Navbar scroll
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (window.scrollY > 20) nb.classList.add('scrolled');
  else nb.classList.remove('scrolled');
});

// ─── BURGER MENU ───
function toggleMenu() {
  const nav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-overlay');
  const burger = document.getElementById('burger');
  const isOpen = nav.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    nav.classList.add('open');
    overlay.classList.add('active');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeMenu() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('mobile-overlay').classList.remove('active');
  document.getElementById('burger').classList.remove('open');
  document.body.style.overflow = '';
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// FAQ toggle
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Counter animation
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let count = 0;
  const timer = setInterval(() => {
    current += increment;
    count++;
    if (count >= steps) {
      current = target;
      clearInterval(timer);
    }
    if (target >= 1000) {
      el.textContent = Math.round(current).toLocaleString() + suffix;
    } else if (isDecimal) {
      el.textContent = current.toFixed(1) + suffix;
    } else {
      el.textContent = Math.round(current) + suffix;
    }
  }, duration / steps);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) counterObserver.observe(statsGrid);

// Popup
function openPopup() {
  document.getElementById('popup-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closePopup() {
  document.getElementById('popup-overlay').classList.remove('active');
  document.body.style.overflow = '';
}
function closePopupOnBg(e) {
  if (e.target === document.getElementById('popup-overlay')) closePopup();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

// Forms
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = '✓ Sent! We\'ll be in touch within 4 hours.';
  btn.style.background = '#3DD68C';
  btn.disabled = true;
}
function handlePopupForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = '✓ Request Sent!';
  btn.disabled = true;
  setTimeout(closePopup, 1500);
}
