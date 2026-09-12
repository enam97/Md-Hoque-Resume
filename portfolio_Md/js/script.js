(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));

  function setActiveLink() {
    var scrollPos = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navAnchors.forEach(function (a) {
      var match = a.getAttribute('href') === '#' + current.id;
      a.classList.toggle('is-active', match);
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Smooth scroll (respects reduced motion) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      history.pushState(null, '', '#' + id);
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('is-visible', window.scrollY > 640);
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Project filtering ---------- */
  var chips = document.querySelectorAll('.filter-chip');
  var cards = document.querySelectorAll('.project-card');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var filter = chip.getAttribute('data-filter');
      cards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.hidden = !match;
      });
    });
  });

  /* ---------- Certification list expand/collapse ---------- */
  var certToggle = document.getElementById('certToggle');
  var certList = document.getElementById('certList');
  if (certToggle && certList) {
    certToggle.addEventListener('click', function () {
      var collapsed = certList.classList.toggle('is-collapsed');
      certToggle.textContent = collapsed ? 'Show all certifications' : 'Show fewer certifications';
      certToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var counterIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterIo.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var status = document.getElementById('formStatus');

    function showError(fieldId, msg) {
      var errEl = document.getElementById('err-' + fieldId);
      if (errEl) errEl.textContent = msg;
    }
    function clearErrors() {
      ['name', 'email', 'message'].forEach(function (f) { showError(f, ''); });
    }
    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();
      status.textContent = '';

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var valid = true;

      if (!name) { showError('name', 'Please enter your name.'); valid = false; }
      if (!email) { showError('email', 'Please enter your email.'); valid = false; }
      else if (!isValidEmail(email)) { showError('email', 'Please enter a valid email address.'); valid = false; }
      if (!message) { showError('message', 'Please enter a message.'); valid = false; }

      if (!valid) return;

      /* No backend is connected — this opens the visitor's email client
         pre-filled with the message so it reaches the inbox directly.
         Replace with a form service or API call if you wire one up. */
      var subject = encodeURIComponent('Portfolio contact from ' + name);
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:enam97@gmail.com?subject=' + subject + '&body=' + body;

      status.textContent = 'Opening your email client to send this message…';
      form.reset();
    });
  }
})();
