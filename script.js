/* ============================================
   ELBROTH PORTFOLIO v2 — SCRIPT
   Scroll reveals · Nav · Card effects · Counters
   ============================================ */

(function () {
  'use strict';

  // ===== INIT LUCIDE ICONS =====
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ===== NAV SCROLL BEHAVIOR =====
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');

  function openNav() {
    navToggle.classList.add('active');
    navLinks.classList.add('open');
    navBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeNav() : openNav();
  });

  navBackdrop.addEventListener('click', closeNav);

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  // ===== PROJECT CARD MOUSE GLOW =====
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // ===== SMOOTH ANCHOR SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.classList.toggle(
              'nav__link--active',
              a.getAttribute('href') === '#' + id
            );
          });
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '-80px 0px -50% 0px',
    }
  );

  sections.forEach((section) => activeObserver.observe(section));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ===== HERO ENTRANCE =====
  const heroName = document.querySelector('.hero__name');
  if (heroName) {
    heroName.style.opacity = '0';
    heroName.style.transform = 'translateY(24px) scale(0.96)';
    setTimeout(() => {
      heroName.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
      heroName.style.opacity = '1';
      heroName.style.transform = 'translateY(0) scale(1)';
    }, 200);
  }

  // ===== PARALLAX GLOW ON HERO =====
  const glows = document.querySelectorAll('.hero__glow');

  if (glows.length > 0 && window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      glows.forEach((glow, i) => {
        const factor = (i + 1) * 0.6;
        glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    }, { passive: true });
  }

  // ===== CONSOLE EASTER EGG =====
  console.log(
    '%c⚡ Elbroth Portfolio',
    'color: #00d4aa; font-size: 20px; font-weight: bold;'
  );
  console.log(
    '%cWeb3 · AI · Builder',
    'color: #8888a0; font-size: 12px;'
  );
  console.log(
    '%cVanilla HTML, CSS & JS — no frameworks.',
    'color: #4e4e66; font-size: 11px;'
  );

})();
