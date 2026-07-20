import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const quotes = [
  '"Fashion is the armour to survive the reality of everyday life." — Bill Cunningham',
  '"Elegance is elimination." — Cristóbal Balenciaga',
  '"Fashion is not something that exists in dresses only." — Coco Chanel',
  '"Luxury must be comfortable, otherwise it is not luxury." — Coco Chanel',
  '"I have always believed that fashion was not only to make women more beautiful, but also to reassure them." — Cristóbal Balenciaga',
];

export function initPreloader() {
  return new Promise((resolve) => {
    const preloader = document.getElementById('preloader');
    if (!preloader) { resolve(); return; }

    const logo = preloader.querySelector('.preloader__logo');
    const line = preloader.querySelector('.preloader__line');
    const counter = preloader.querySelector('.preloader__counter');
    const quote = preloader.querySelector('.preloader__quote');
    const reveal = preloader.querySelector('.preloader__reveal');

    let currentQuote = 0;
    quote.textContent = quotes[0];

    const tl = gsap.timeline({
      onComplete: () => {
        preloader.classList.add('is-done');
        setTimeout(() => { preloader.style.display = 'none'; }, 600);
        resolve();
      }
    });

    tl.to(logo, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(line, { width: '120px', duration: 1.2, ease: 'power2.inOut' }, '-=0.3')
      .to(counter, { opacity: 1, duration: 0.4 }, '-=0.8')
      .to(quote, { opacity: 1, duration: 0.6 }, '-=0.4');

    const countObj = { val: 0 };
    gsap.to(countObj, {
      val: 100,
      duration: 3,
      ease: 'power1.inOut',
      onUpdate: () => {
        counter.textContent = Math.floor(countObj.val);
      },
    });

    let quoteInterval = setInterval(() => {
      currentQuote = (currentQuote + 1) % quotes.length;
      gsap.to(quote, {
        opacity: 0, duration: 0.3, onComplete: () => {
          quote.textContent = quotes[currentQuote];
          gsap.to(quote, { opacity: 1, duration: 0.3 });
        }
      });
    }, 1200);

    tl.to({}, { duration: 3.5, onComplete: () => clearInterval(quoteInterval) });

    tl.to(logo, { opacity: 0, y: -20, duration: 0.4 }, '+=0.2')
      .to(line, { opacity: 0, duration: 0.3 }, '-=0.3')
      .to(counter, { opacity: 0, duration: 0.3 }, '-=0.3')
      .to(quote, { opacity: 0, duration: 0.3 }, '-=0.3')
      .to(reveal, {
        scaleY: 1,
        duration: 0.8,
        ease: 'power4.inOut',
      }, '-=0.1')
      .to(preloader, { opacity: 0, duration: 0.4 }, '+=0.1');
  });
}
