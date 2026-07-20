import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  initHeroEntrance();
  initScrollReveals();
  initNavHideOnScroll();
  initSkillBars();
  initCounters();
}

function initHeroEntrance() {
  const heroWords = document.querySelectorAll('.hero__title-word');
  const heroLabel = document.querySelector('.hero__label');
  const heroSubtitle = document.querySelector('.hero__subtitle');
  const heroCta = document.querySelector('.hero__cta-group');
  const heroScroll = document.querySelector('.hero__scroll');

  const tl = gsap.timeline({ delay: 4.2 });

  if (heroWords.length) {
    tl.to(heroWords, { y: '0%', duration: 1.2, stagger: 0.12, ease: 'power3.out' });
  }
  if (heroLabel) tl.to(heroLabel, { opacity: 1, duration: 0.6 }, '-=0.6');
  if (heroSubtitle) tl.to(heroSubtitle, { opacity: 1, duration: 0.6 }, '-=0.4');
  if (heroCta) tl.to(heroCta, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
  if (heroScroll) tl.to(heroScroll, { opacity: 1, duration: 0.6 }, '-=0.2');
}

function initScrollReveals() {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  document.querySelectorAll('.section__line').forEach(line => {
    gsap.fromTo(line, { width: 0 }, {
      width: 60, duration: 0.8, ease: 'power2.inOut',
      scrollTrigger: { trigger: line, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });
}

function initNavHideOnScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  ScrollTrigger.create({
    start: 'top -100', end: 99999,
    onUpdate: (self) => {
      nav.classList.toggle('is-hidden', self.direction === 1);
    }
  });
}

function initSkillBars() {
  document.querySelectorAll('.skill-item').forEach(item => {
    const val = item.getAttribute('data-skill');
    const fill = item.querySelector('.skill-item__bar-fill');
    if (fill && val) {
      gsap.to(fill, {
        width: val + '%', duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' }
      });
    }
  });
}

function initCounters() {
  document.querySelectorAll('[data-count]').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 1.5, ease: 'power2.out',
      onUpdate: () => { counter.textContent = Math.floor(obj.val); },
      scrollTrigger: { trigger: counter, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
}
