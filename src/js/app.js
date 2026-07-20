import { initPreloader } from './preloader.js';
import { initCursor } from './cursor.js';
import { initMenu } from './menu.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initAnimations } from './animations.js';

async function init() {
  await initPreloader();
  initCursor();
  initMenu();
  initSmoothScroll();
  initAnimations();
  initContactForm();
  initFAQ();
  initGalleryFilter();
  initLightbox();
  initBlogFilter();
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const textEl = btn?.querySelector('.btn__text');
    if (!textEl) return;
    const orig = textEl.textContent;
    textEl.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      textEl.textContent = 'Message Sent';
      setTimeout(() => { textEl.textContent = orig; btn.disabled = false; form.reset(); }, 2500);
    }, 1500);
  });
}

function initFAQ() {
  document.querySelectorAll('.faq__item').forEach(item => {
    const btn = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    const icon = item.querySelector('.faq__question-icon');
    if (!btn || !answer) return;
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq__question[aria-expanded="true"]').forEach(b => {
        if (b !== btn) {
          b.setAttribute('aria-expanded', 'false');
          const a = b.closest('.faq__item')?.querySelector('.faq__answer');
          if (a) a.hidden = true;
          const i = b.querySelector('.faq__question-icon');
          if (i) i.textContent = '+';
        }
      });
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
      if (icon) icon.textContent = isOpen ? '+' : '\u2212';
    });
  });
}

function initGalleryFilter() {
  const btns = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');
  if (!btns.length || !items.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = '';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-image');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const counter = document.getElementById('lightbox-current');
  const total = document.getElementById('lightbox-total');
  const caption = document.getElementById('lightbox-caption');
  if (!lightbox || !img) return;

  let idx = 0;
  const imgs = [];
  document.querySelectorAll('.masonry__link').forEach((link, i) => {
    const im = link.querySelector('img');
    const title = link.querySelector('.masonry__title');
    if (im) {
      imgs.push({ src: im.src.replace('w=600', 'w=1200'), alt: im.alt, caption: title?.textContent || '' });
      link.addEventListener('click', e => { e.preventDefault(); idx = i; show(); });
    }
  });
  if (total) total.textContent = imgs.length;

  function show() {
    if (!imgs[idx]) return;
    img.src = imgs[idx].src;
    img.alt = imgs[idx].alt;
    if (counter) counter.textContent = idx + 1;
    if (caption) caption.textContent = imgs[idx].caption;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function hide() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  closeBtn?.addEventListener('click', hide);
  prevBtn?.addEventListener('click', () => { idx = (idx - 1 + imgs.length) % imgs.length; show(); });
  nextBtn?.addEventListener('click', () => { idx = (idx + 1) % imgs.length; show(); });
  lightbox.addEventListener('click', e => { if (e.target === lightbox) hide(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') { idx = (idx - 1 + imgs.length) % imgs.length; show(); }
    if (e.key === 'ArrowRight') { idx = (idx + 1) % imgs.length; show(); }
  });
}

function initBlogFilter() {
  const btns = document.querySelectorAll('[data-filter]');
  const articles = document.querySelectorAll('[data-category]');
  if (!btns.length || !articles.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      articles.forEach(a => {
        const cat = a.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          a.style.display = '';
          a.style.opacity = '1';
        } else {
          a.style.opacity = '0';
          setTimeout(() => { a.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
