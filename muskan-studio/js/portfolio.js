/* ============================================
   MUSKAN STUDIO — Portfolio Filter
   ============================================ */

(function() {
    'use strict';

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (!filterButtons.length || !portfolioCards.length) return;

    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(function(b) {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            // Filter cards
            portfolioCards.forEach(function(card) {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';

                    setTimeout(function() {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

})();