import gsap from 'gsap';

export function initMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const nav = document.getElementById('nav');
  if (!menuBtn || !menuOverlay) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    menuBtn.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuOverlay.classList.add('is-open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const links = menuOverlay.querySelectorAll('.menu-overlay__link');
    gsap.fromTo(links, { y: '100%' }, {
      y: '0%',
      duration: 0.8,
      stagger: 0.08,
      ease: 'power4.out',
      delay: 0.2,
    });
  }

  function closeMenu() {
    isOpen = false;
    menuBtn.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');

    const links = menuOverlay.querySelectorAll('.menu-overlay__link');
    gsap.to(links, {
      y: '-100%',
      duration: 0.5,
      stagger: 0.04,
      ease: 'power3.in',
      onComplete: () => {
        menuOverlay.classList.remove('is-open');
        menuOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  menuBtn.addEventListener('click', () => {
    if (isOpen) closeMenu();
    else openMenu();
  });

  menuOverlay.querySelectorAll('.menu-overlay__link').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
}
