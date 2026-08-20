// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 800); // 800ms delay for premium feel
});

const menuButton = document.querySelector('.menu');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.textContent = open ? '✕' : '☰';
});

nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  });
});

const cities = {
  lucknow: {
    letter: 'L',
    subtitle: 'City of Tehzeeb',
    date: 'September 2026 — Proposed Opening Edition',
    name: 'Lucknow',
    tagline: 'Shaam-e-Awadh | तहज़ीब के शहर में, शब्दों की एक यादगार महफ़िल।',
    description: 'Lucknow sirf ek shahar nahi, ek andaaz hai. Yahan ki tehzeeb, adab, zubaan aur shayari ne hamesha Hindi-Urdu culture ko ek khaas pehchaan di hai.'
  },
  bhopal: {
    letter: 'B',
    subtitle: 'City of Shayari, Ghazal and Literary Depth',
    date: 'November 2026 — Proposed Edition',
    name: 'Bhopal',
    tagline: 'Shayari aur Ghazal ka Shahar',
    description: 'Bhopal will host a carefully curated evening of poetry, humour, reflection and contemporary expression in a premium auditorium setting.'
  },
  jaipur: {
    letter: 'J',
    subtitle: 'Heritage, Royalty and Cultural Pride',
    date: 'January / February 2027 — Proposed Edition',
    name: 'Jaipur',
    tagline: 'Tradition, expression and city pride on one stage.',
    description: 'The Jaipur edition will celebrate the enduring relationship between language, performance, community and cultural identity.'
  },
  patna: {
    letter: 'P',
    subtitle: 'High-energy Hindi Heartland Market',
    date: 'January / February 2027 — Proposed Edition',
    name: 'Patna',
    tagline: 'Memorable words for an audience deeply connected with Hindi.',
    description: 'The Patna edition will bring humour, lyrical poetry, powerful expression and social observation to a highly engaged audience.'
  },
  delhi: {
    letter: 'D',
    subtitle: 'National Capital / Grand Finale Edition',
    date: 'March 2027 — Proposed Grand Finale',
    name: 'Delhi',
    tagline: 'The journey culminates in its biggest celebration.',
    description: 'The Delhi edition is planned as the flagship grand finale, bringing together leading voices and the collective energy of the entire series.'
  }
};

document.querySelectorAll('.city-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.city-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const c = cities[btn.dataset.city];
    document.getElementById('city-letter').textContent = c.letter;
    document.getElementById('city-subtitle').textContent = c.subtitle;
    document.getElementById('city-date').textContent = c.date;
    document.getElementById('city-name').textContent = c.name;
    document.getElementById('city-tagline').textContent = c.tagline;
    document.getElementById('city-description').textContent = c.description;
    document.getElementById('city-cta').textContent = `Notify Me About ${c.name}`;
    
    const citySelect = document.querySelector('form#interest-form [name="city"]');
    if (citySelect) {
      citySelect.value = c.name;
    }
  });
});

const tiers = {
  presenting: [
    'Lead the cultural association',
    'Premium naming aur visibility across the proposed event journey, subject to final deliverables aur city selection.'
  ],
  powered: [
    'Build high-frequency brand presence',
    'Prominent on-ground aur digital integration across selected cities aur content formats.'
  ],
  associate: [
    'Own meaningful audience touchpoints',
    'A balanced mix of stage visibility, hospitality aur content-led association.'
  ],
  city: [
    'Celebrate a city with cultural relevance',
    'A locally rooted partnership aligned with the identity aur audiences of a selected host city.'
  ],
  digital: [
    'Extend the experience beyond the auditorium',
    'Digital-first integrations across video, social content, edits aur event microsite visibility.'
  ]
};

document.querySelectorAll('.tier').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tier').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const [title, copy] = tiers[btn.dataset.tier];
    document.getElementById('tier-title').textContent = title;
    document.getElementById('tier-copy').textContent = copy;
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const interestForm = document.getElementById('interest-form');
if (interestForm) {
  interestForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.currentTarget;
    const status = document.getElementById('form-status');
    if (!form.checkValidity()) {
      status.textContent = 'Please complete all required fields.';
      status.style.color = '#a62a2a';
      form.reportValidity();
      return;
    }
    status.textContent = 'Thank you for showing interest in Navbharat Times Kavi Sammelan - Shaam-e-Awadh. Your details have been received. Our team may contact you closer to the event, subject to registration process, venue capacity and confirmation.';
    status.style.color = '#24613f';
    form.reset();
  });
}

const partnerForm = document.getElementById('partner-form');
if (partnerForm) {
  partnerForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.currentTarget;
    const status = document.getElementById('partner-form-status');
    if (!form.checkValidity()) {
      status.textContent = 'Please complete all required fields.';
      status.style.color = '#a62a2a';
      form.reportValidity();
      return;
    }
    status.textContent = 'Thank you for your partnership interest. The Navbharat Times team will review your enquiry and connect with you shortly.';
    status.style.color = '#24613f';
    form.reset();
  });
}
