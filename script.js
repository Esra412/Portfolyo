const skills = [
  { name: 'HTML / CSS', pct: 85 },
  { name: 'JavaScript', pct: 75 },
  { name: 'PHP', pct: 65 },
  { name: 'C#', pct: 77 },
  { name: 'Node.js', pct: 33 },
  { name: 'SQL', pct: 55 },
  { name: 'Figma', pct: 40 },
  { name: 'Krita', pct: 70 },
  { name: 'GitHub', pct: 80 },
  { name: 'Unity', pct: 60 },
  { name: 'Python', pct: 10 },
];

const projects = [
  {
    idx: '01',
    tagKey: 'projects.items.weather.tag',
    titleKey: 'projects.items.weather.title',
    descKey: 'projects.items.weather.desc',
    tech: ['HTML', 'CSS', 'JavaScript', 'API'],
  },
  {
    idx: '02',
    tagKey: 'projects.items.educommerce.tag',
    titleKey: 'projects.items.educommerce.title',
    descKey: 'projects.items.educommerce.desc',
    tech: ['Node.js', 'JSON', 'HTML', 'CSS', 'JavaScript', 'Proxy'],
  },
  {
    idx: '03',
    tagKey: 'projects.items.edudev.tag',
    titleKey: 'projects.items.edudev.title',
    descKey: 'projects.items.edudev.desc',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    idx: '04',
    tagKey: 'projects.items.unity.tag',
    titleKey: 'projects.items.unity.title',
    descKey: 'projects.items.unity.desc',
    tech: ['C#', 'Unity', 'Krita'],
  },
];

function tr(key, fallback) {
  if (typeof t === 'function') {
    const translated = t(key);
    return translated === key && fallback ? fallback : translated;
  }
  return fallback || key;
}

function renderSkills() {
  const skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;

  skillsGrid.innerHTML = skills.map((skill) => `
    <div class="skill-card">
      <div class="skill-pct">${skill.pct}%</div>
      <div class="skill-name">${skill.name}</div>
      <div class="skill-bar-bg"><div class="skill-bar-fill" data-w="${skill.pct}" style="--skill-width: ${skill.pct}%"></div></div>
    </div>
  `).join('');
}

function renderProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  projectsGrid.innerHTML = projects.map((project) => `
    <div class="proj-card">
      <div class="proj-top">
        <span class="proj-index">${project.idx}</span>
        <span class="proj-badge">${tr(project.tagKey, 'Web')}</span>
      </div>
      <div class="proj-body">
        <div class="proj-title">${tr(project.titleKey, 'Project')}</div>
        <p class="proj-desc">${tr(project.descKey, '')}</p>
        <div class="proj-tags">${project.tech.map((tech) => `<span class="proj-tag">${tech}</span>`).join('')}</div>
        <div class="proj-links">
          <a href="#" class="proj-link">${tr('projects.demo', 'Demo')} -></a>
          <a href="#" class="proj-link">${tr('projects.repo', 'Repo')}</a>
        </div>
      </div>
    </div>
  `).join('');
}

function updateCvLanguage(lang) {
  const cvTitle = document.getElementById('cv-title');
  const cvSub = document.getElementById('cv-sub');
  const cvButton = document.getElementById('cv-dl-btn');

  if (cvTitle) cvTitle.textContent = tr('cv.box.title', 'CV');
  if (cvSub) cvSub.textContent = tr('cv.box.sub', '');
  if (cvButton) cvButton.textContent = tr('cv.box.button', 'Download');

  document.querySelectorAll('.cv-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });
}

function setupSkillsAnimation() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const animateBars = () => {
    skillsSection.querySelectorAll('.skill-bar-fill').forEach((bar) => {
      bar.style.setProperty('--skill-width', `${bar.dataset.w}%`);
      bar.classList.add('animate');
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillsSection);
}

document.querySelectorAll('.cv-btn').forEach((button) => {
  button.addEventListener('click', () => {
    updateCvLanguage(button.dataset.lang);
  });
});

renderSkills();
renderProjects();
updateCvLanguage(localStorage.getItem('language') || 'en');
setupSkillsAnimation();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener('languageChanged', () => {
  const currentLang = localStorage.getItem('language') || 'en';
  renderProjects();
  updateCvLanguage(currentLang);
});
