/* ═══════════════════════════════════════════════
   Grand Shaam-e-Awadh — Interaction Layer
   Lightweight, performance-conscious JS
   ═══════════════════════════════════════════════ */

// --- Loader: fast dismiss, with a safety net if `load` is slow (e.g. 3G) ---
const hideLoader = () => {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
};
window.addEventListener('load', () => setTimeout(hideLoader, 300));
setTimeout(hideLoader, 2500);

// --- Mobile Navigation ---
const menuButton = document.querySelector('.menu');
const nav = document.querySelector('nav');
const navQuery = window.matchMedia('(max-width: 1100px)');

const setNav = (open) => {
  if (!menuButton || !nav) return;
  nav.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
};

if (menuButton && nav) {
  menuButton.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setNav(false);
      menuButton.focus();
    }
  });
  navQuery.addEventListener('change', e => { if (!e.matches) setNav(false); });
}

// --- Header scroll state ---
const header = document.getElementById('site-header');
if (header) {
  let lastKnown = 0;
  let ticking = false;

  const updateHeader = () => {
    if (lastKnown > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    lastKnown = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

// --- Scroll Reveal (IntersectionObserver) ---
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });
} else {
  // Immediately show all elements if reduced motion is preferred
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    el.classList.add('visible');
  });
}


// --- City Tabs ---
const cities = {
  lucknow: {
    date: '27 November 2026',
    name: 'Lucknow',
    tagline: 'Grand Shaam-e-Awadh | City of Tehzeeb',
  },
  bhopal: {
    date: 'November 2026 — Proposed',
    name: 'Bhopal',
    tagline: 'City of Shayari, Ghazal and Literary Depth',
  },
  jaipur: {
    date: 'January / February 2027 — Proposed',
    name: 'Jaipur',
    tagline: 'Heritage, Royalty and Cultural Pride',
  },
  patna: {
    date: 'January / February 2027 — Proposed',
    name: 'Patna',
    tagline: 'High-energy Hindi Heartland',
  },
  delhi: {
    date: 'March 2027 — Proposed Grand Finale',
    name: 'Delhi',
    tagline: 'National Capital | Grand Finale Edition',
  }
};

document.querySelectorAll('.city-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.city-tabs button').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    const c = cities[btn.dataset.city];
    const dateEl = document.getElementById('city-date');
    const nameEl = document.getElementById('city-name');
    const taglineEl = document.getElementById('city-tagline');
    
    if (dateEl) dateEl.textContent = c.date;
    if (nameEl) nameEl.textContent = c.name;
    if (taglineEl) taglineEl.textContent = c.tagline;

    // Also update registration form city selection
    const citySelect = document.querySelector('form#interest-form [name="city"]');
    if (citySelect) {
      citySelect.value = c.name;
    }
  });
});


// --- Form Handling ---
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
    status.textContent = 'Thank you for your interest in Grand Shaam-e-Awadh. Your details have been received. Our team may contact you once registrations open.';
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
    status.textContent = 'Thank you for your partnership interest. Our team will review your enquiry and connect with you shortly.';
    status.style.color = '#24613f';
    form.reset();
  });
}
