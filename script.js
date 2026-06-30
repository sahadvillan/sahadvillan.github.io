const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');

window.addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 20), { passive: true });
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('open');
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .1 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const glow = document.querySelector('[data-cursor-glow]');
window.addEventListener('pointermove', (event) => {
  if (glow) glow.style.transform = `translate(${event.clientX - 225}px, ${event.clientY - 225}px)`;
}, { passive: true });
document.querySelectorAll('[data-year]').forEach((node) => node.textContent = new Date().getFullYear());

const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({
  '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
}[character]));

const renderProjects = (projects = []) => {
  const list = document.querySelector('[data-project-list]');
  if (list?.querySelector('[data-project-slug]')) return;
  const extra = projects.filter((project) => project.slug !== 'or-lens' && project.visible !== false);
  if (!list || !extra.length) return;
  extra.forEach((project, index) => {
    const article = document.createElement('article');
    article.className = 'project-featured reveal visible';
    const video = project.video ? `
      <video class="project-card-video" autoplay muted loop playsinline preload="metadata" ${project.poster ? `poster="${escapeHtml(project.poster)}"` : ''} aria-label="${escapeHtml(project.videoLabel || project.title)}">
        <source src="${escapeHtml(project.video)}" type="video/mp4">
      </video>` : '';
    article.innerHTML = `
      <a class="project-visual${video ? ' has-video' : ''}" href="${escapeHtml(project.href || '#')}" style="background:${escapeHtml(project.color || '#34372f')}">
        ${video}
        <span class="project-open">Open case study ↗</span>
      </a>
      <div class="project-copy">
        <div class="project-meta"><span>${String(index + 2).padStart(2,'0')} / PROJECT</span><span>${escapeHtml(project.year || '')}</span></div>
        <h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p>
        <ul>${(project.tags || []).map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>
        <a href="${escapeHtml(project.href || '#')}">Read the complete story <span>↗</span></a>
      </div>`;
    list.appendChild(article);
  });
  document.querySelector('[data-project-placeholder]')?.remove();
};

const renderExperience = (items = []) => {
  if (!items.length) return;
  const list = document.querySelector('[data-experience-list]');
  if (!list) return;
  if (list.hasAttribute('data-experience-static')) return;
  list.innerHTML = items.map((item) => `
    <article class="experience-item">
      <time>${escapeHtml(item.period)}</time>
      <div><h3>${escapeHtml(item.role)}<span>${escapeHtml(item.company)} · ${escapeHtml(item.location || '')}</span></h3>
      <ul>${(item.highlights || []).map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul></div>
    </article>`).join('');
};

fetch('data/profile.json', { cache: 'no-store' }).then((response) => response.json()).then((profile) => {
  if (profile.intro) document.querySelector('[data-profile-intro]').textContent = profile.intro;
  if (profile.availability) document.querySelector('[data-availability]').textContent = profile.availability;
  if (profile.location) document.querySelector('[data-location]').textContent = profile.location;
  if (profile.aboutLead) document.querySelector('[data-about-lead]').textContent = profile.aboutLead;
  if (profile.aboutBody) document.querySelector('[data-about-body]').textContent = profile.aboutBody;
  renderProjects(profile.projects);
  renderExperience(profile.experience);
}).catch(() => {});
