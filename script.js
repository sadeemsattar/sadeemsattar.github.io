// ===== Nav shadow on scroll + progress bar =====
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
  io.observe(el);
});

// ===== Mobile menu =====
const burger = document.getElementById('burger');
const links = document.querySelector('.nav__links');
burger?.addEventListener('click', () => links.classList.toggle('open'));
links?.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => links.classList.remove('open'))
);
