/* ============================================
   MARATHON-INSPIRED PORTFOLIO — SCRIPT.JS
   ============================================ */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');

if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.6)';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Scale cursor on hoverable elements
  const hoverables = document.querySelectorAll('a, button, .project-card, .project-full-card, .contact-link');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursor.style.borderColor = 'var(--red)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderColor = 'var(--acid)';
    });
  });
}

// ── SCROLL FADE-UP ANIMATION ──
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards that are siblings
      const siblings = [...fadeEls].filter(el =>
        el.parentElement === entry.target.parentElement
      );
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ── SKILL BAR ANIMATION ──
const skillBars = document.querySelectorAll('.skill-level-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.width; // trigger transition
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Set initial width to 0 and animate in
skillBars.forEach(bar => {
  const targetWidth = bar.style.width;
  bar.style.width = '0%';
  bar.dataset.target = targetWidth;

  barObserver.observe(bar);
});

// Animate bars once visible
const barTrigger = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-level-fill');
      fills.forEach((fill, i) => {
        setTimeout(() => {
          fill.style.width = fill.dataset.target;
        }, i * 80);
      });
      barTrigger.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsGrid = document.querySelector('.about-skills-grid');
if (skillsGrid) barTrigger.observe(skillsGrid);

// ── NAV ACTIVE STATE ──
// Already handled by data-page attribute on <html> + CSS selectors.
// This JS version is a fallback.
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath) {
    link.classList.add('active');
  }
});

// ── HERO BAR COUNTER ANIMATION ──
function animateCount(el, target, suffix = '') {
  if (!el) return;
  let current = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(interval);
  }, 30);
}

// ── GLITCH TEXT EFFECT (subtle) ──
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  setInterval(() => {
    if (Math.random() > 0.97) {
      heroTitle.style.transform = `translate(${(Math.random()-0.5)*3}px, ${(Math.random()-0.5)*2}px)`;
      setTimeout(() => { heroTitle.style.transform = ''; }, 80);
    }
  }, 1000);
}

// ── HUD CLOCK ──
const hud = document.querySelector('.hero-hud');
if (hud) {
  setInterval(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
    // Update last line if it exists
    const lines = hud.innerHTML.split('<br>');
    if (lines.length > 0) {
      lines[lines.length - 1] = timeStr;
      hud.innerHTML = lines.join('<br>');
    }
  }, 1000);
}

// ── PAGE TRANSITION ──
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  // Only intercept same-site links (not anchors, not external)
  if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.25s ease';
      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  }
});

// Fade in on load
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
});
