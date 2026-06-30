const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('open');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();

const formatResult = (key, value) => {
  if (value === null || value === undefined || value === '') return 'Training';
  const number = Number(value);
  if (!Number.isFinite(number)) return String(value);
  if (key === 'accuracy') return `${(number * 100).toFixed(1)}%`;
  return number.toFixed(3);
};

fetch('data/results.json', { cache: 'no-store' })
  .then((response) => response.ok ? response.json() : Promise.reject(new Error('No results')))
  .then((results) => {
    document.querySelectorAll('[data-result]').forEach((element) => {
      const key = element.dataset.result;
      element.textContent = formatResult(key, results[key]);
    });
    if (results.status) {
      const status = document.querySelector('[data-project-status]');
      if (status) status.textContent = results.status;
    }
  })
  .catch(() => {
    // Training placeholders are intentional until the real held-out run completes.
  });

const video = document.querySelector('[data-project-video]');
const videoShell = document.querySelector('[data-video-shell]');
if (video && videoShell) {
  video.addEventListener('loadedmetadata', () => videoShell.classList.add('has-video'));
  video.addEventListener('error', () => videoShell.classList.remove('has-video'));
  video.src = 'assets/or-lens-project-film.mp4';
}
