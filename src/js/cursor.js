import gsap from 'gsap';

export function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower || window.matchMedia('(max-width: 768px)').matches) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;

    cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;
    follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

    requestAnimationFrame(animate);
  }
  animate();

  const hoverElements = document.querySelectorAll('a, button, [data-cursor]');
  hoverElements.forEach(el => {
    const cursorText = el.getAttribute('data-cursor');
    el.addEventListener('mouseenter', () => {
      if (cursorText) {
        cursor.querySelector('.cursor__text').textContent = cursorText;
        cursor.classList.add('is-viewing');
      } else {
        cursor.classList.add('is-hovering');
      }
      follower.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering', 'is-viewing');
      follower.classList.remove('is-hovering');
    });
  });

  document.addEventListener('mousedown', () => {
    gsap.to(cursor, { scale: 0.8, duration: 0.15 });
    gsap.to(follower, { scale: 0.8, duration: 0.2 });
  });

  document.addEventListener('mouseup', () => {
    gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
    gsap.to(follower, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
  });
}
