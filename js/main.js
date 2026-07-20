// Mobile menu
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-menu__close');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = btn.classList.contains('open');

    document.querySelectorAll('.faq-q.open').forEach(b => {
      b.classList.remove('open');
      b.closest('.faq-item').querySelector('.faq-a').classList.remove('open');
    });

    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
    }
  });
});

// Gallery filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.masonry-item').forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
let lbIndex = 0;
const lbItems = [];

document.querySelectorAll('.masonry-item').forEach((item, i) => {
  const img = item.querySelector('img');
  if (img) {
    lbItems.push(img.src);
    item.addEventListener('click', () => {
      lbIndex = i;
      lbImg.src = lbItems[lbIndex];
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
});

document.getElementById('lb-x')?.addEventListener('click', closeLB);
document.getElementById('lb-prev')?.addEventListener('click', () => { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; lbImg.src = lbItems[lbIndex]; });
document.getElementById('lb-next')?.addEventListener('click', () => { lbIndex = (lbIndex + 1) % lbItems.length; lbImg.src = lbItems[lbIndex]; });
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLB();
  if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; lbImg.src = lbItems[lbIndex]; }
  if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbItems.length; lbImg.src = lbItems[lbIndex]; }
});

function closeLB() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// Contact form
const cForm = document.getElementById('contactForm');
if (cForm) {
  cForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = cForm.querySelector('.btn');
    const txt = btn?.querySelector('span');
    if (!txt) return;
    const orig = txt.textContent;
    txt.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      txt.textContent = 'Sent!';
      setTimeout(() => { txt.textContent = orig; btn.disabled = false; cForm.reset(); }, 2000);
    }, 1200);
  });
}

// Admin sidebar nav
document.querySelectorAll('.admin-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
