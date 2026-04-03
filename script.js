const skills = [
  { name: 'HTML / CSS', pct: 85 },
  { name: 'JavaScript', pct: 75 },
  { name: 'React', pct: 60 },
  { name: 'Python', pct: 65 },
  { name: 'Git / GitHub', pct: 70 },
  { name: 'SQL', pct: 55 },
  { name: 'Figma', pct: 50 },
  { name: 'Node.js', pct: 45 },
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
    tagKey: 'projects.items.todo.tag',
    titleKey: 'projects.items.todo.title',
    descKey: 'projects.items.todo.desc',
    tech: ['React', 'CSS', 'localStorage'],
  },
  {
    idx: '03',
    tagKey: 'projects.items.quiz.tag',
    titleKey: 'projects.items.quiz.title',
    descKey: 'projects.items.quiz.desc',
    tech: ['Python', 'JSON'],
  },
  {
    idx: '04',
    tagKey: 'projects.items.portfolio.tag',
    titleKey: 'projects.items.portfolio.title',
    descKey: 'projects.items.portfolio.desc',
    tech: ['HTML', 'CSS'],
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
      <div class="skill-bar-bg"><div class="skill-bar-fill" data-w="${skill.pct}"></div></div>
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

const cvData = {
  fi: { title: 'Suomenkielinen CV', sub: 'Lataa PDF-muodossa', btn: 'Lataa', hint: 'Voit ladata oman CV-tiedostosi tahan' },
  en: { title: 'English CV', sub: 'Download as PDF', btn: 'Download', hint: 'You can upload your own CV file here' },
  tr: { title: 'Turkce Ozgecmis', sub: 'PDF olarak indir', btn: 'Indir', hint: 'Kendi CV dosyanizi buraya yukleyebilirsiniz' },
};

function updateCvLanguage(lang) {
  const data = cvData[lang] || cvData.fi;
  document.getElementById('cv-title').textContent = data.title;
  document.getElementById('cv-sub').textContent = data.sub;
  document.getElementById('cv-dl-btn').textContent = data.btn;
  document.getElementById('cv-hint').textContent = data.hint;

  document.querySelectorAll('.cv-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });
}

document.querySelectorAll('.cv-btn').forEach((button) => {
  button.addEventListener('click', () => {
    updateCvLanguage(button.dataset.lang);
  });
});

renderSkills();
renderProjects();
updateCvLanguage('fi');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
        bar.style.width = `${bar.dataset.w}%`;
      });
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  observer.observe(skillsSection);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener('languageChanged', () => {
  const currentLang = localStorage.getItem('language') || 'fi';
  renderProjects();
  updateCvLanguage(currentLang);
});
