/* =========================================================
   SIMHA — Strength Club  ·  GSAP interactions
   ========================================================= */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     PRELOADER
  --------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  const preBar = document.getElementById('preBar');
  const preCount = document.getElementById('preCount');

  function runPreloader(done) {
    if (prefersReduced) { preloader.style.display = 'none'; done(); return; }
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 16;
      if (p >= 100) { p = 100; clearInterval(tick); finish(); }
      preBar.style.width = p + '%';
      preCount.textContent = Math.floor(p);
    }, 110);

    function finish() {
      gsap.to(preloader, {
        yPercent: -100, duration: 1, ease: 'power4.inOut', delay: 0.2,
        onComplete: () => { preloader.style.display = 'none'; done(); }
      });
    }
  }

  /* ---------------------------------------------------------
     CUSTOM CURSOR
  --------------------------------------------------------- */
  function initCursor() {
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursorDot');
    if (!cursor || window.matchMedia('(hover: none)').matches) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    gsap.ticker.add(() => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    });

    document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* ---------------------------------------------------------
     NAV — scrolled state + mobile menu
  --------------------------------------------------------- */
  function initNav() {
    const nav = document.getElementById('nav');
    const burger = document.getElementById('burger');
    const links = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        links.classList.remove('open');
      })
    );
  }

  /* ---------------------------------------------------------
     HERO INTRO
  --------------------------------------------------------- */
  function heroIntro() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('.hero__eyebrow', { y: 30, opacity: 0, duration: 0.8 })
      .from('.hero__title .line > span', {
        yPercent: 110, duration: 1.1, stagger: 0.12
      }, '-=0.4')
      .from('.hero__sub', { y: 30, opacity: 0, duration: 0.9 }, '-=0.7')
      .from('.hero__actions', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('.hero__scroll', { opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.nav', { y: -40, opacity: 0, duration: 0.8 }, '-=1');

    // Hero background subtle parallax + settle
    gsap.to('.hero__bg', { scale: 1, duration: 2.4, ease: 'power3.out' });
  }

  /* ---------------------------------------------------------
     SCROLLTRIGGER REVEALS
  --------------------------------------------------------- */
  function initReveals() {
    // Generic reveals — exclude elements that have their OWN dedicated
    // animation below, so nothing gets a conflicting double `from()` tween
    // (which would otherwise leave it stuck at opacity 0).
    const revealEls = gsap.utils
      .toArray('.reveal-up')
      .filter((el) => !el.matches('.plan'));

    revealEls.forEach((el) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%' }
      });
    });

    // Program cards stagger
    gsap.from('.prog', {
      y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.programs__grid', start: 'top 80%' }
    });

    // Coaches stagger
    gsap.from('.coach', {
      y: 70, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.coaches__grid', start: 'top 82%' }
    });

    // Pricing plans
    gsap.from('.plan', {
      y: 70, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.pricing__grid', start: 'top 82%' }
    });

    // Schedule rows
    gsap.from('.srow', {
      x: -40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: '.schedule__table', start: 'top 85%' }
    });

    // About images
    gsap.from('.about__img--main', {
      scale: 1.15, opacity: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.about__media', start: 'top 80%' }
    });
    gsap.from('.about__img--sub', {
      x: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2,
      scrollTrigger: { trigger: '.about__media', start: 'top 80%' }
    });
    gsap.from('.about__badge', {
      scale: 0, rotate: -90, duration: 0.9, ease: 'back.out(1.7)', delay: 0.4,
      scrollTrigger: { trigger: '.about__media', start: 'top 80%' }
    });
  }

  /* ---------------------------------------------------------
     PARALLAX (background layers)
  --------------------------------------------------------- */
  function initParallax() {
    gsap.utils.toArray('.quote__bg, .cta__bg').forEach((el) => {
      gsap.to(el, {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // Hero content drifts up on scroll
    gsap.to('.hero__content', {
      yPercent: -18, opacity: 0.6, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ---------------------------------------------------------
     COUNTERS
  --------------------------------------------------------- */
  function initCounters() {
    gsap.utils.toArray('.stat').forEach((stat) => {
      const numEl = stat.querySelector('.stat__num');
      const target = +stat.dataset.count;
      const suffix = stat.dataset.suffix || '';
      const obj = { val: 0 };

      ScrollTrigger.create({
        trigger: stat, start: 'top 85%', once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target, duration: 2, ease: 'power2.out',
            onUpdate: () => {
              numEl.textContent = Math.floor(obj.val).toLocaleString('en-US') + suffix;
            }
          });
        }
      });
    });
  }

  /* ---------------------------------------------------------
     MARQUEE — seamless loop
  --------------------------------------------------------- */
  function initMarquee() {
    const track = document.getElementById('marquee');
    if (!track) return;
    const loop = gsap.to(track, {
      xPercent: -50, repeat: -1, duration: 22, ease: 'none'
    });
    // nudge speed on scroll for life
    ScrollTrigger.create({
      trigger: document.body, start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => { loop.timeScale(1 + self.getVelocity() / -4000); }
    });
  }

  /* ---------------------------------------------------------
     BOOT
  --------------------------------------------------------- */
  window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    runPreloader(() => {
      heroIntro();
      ScrollTrigger.refresh();
    });

    initCursor();
    initNav();
    initReveals();
    initParallax();
    initCounters();
    initMarquee();

    // Background images load late and shift layout — recompute trigger
    // positions so reveals fire at the right scroll points.
    setTimeout(() => ScrollTrigger.refresh(), 400);
    window.addEventListener('resize', () => ScrollTrigger.refresh());
  });
})();
