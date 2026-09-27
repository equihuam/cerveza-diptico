/**
 * web.js - Interacciones fluidas para la experiencia web mobile-first
 */

document.addEventListener('DOMContentLoaded', () => {
    const filterPills = document.querySelectorAll('.filter-pill');
    const familyCards = document.querySelectorAll('.family-card-web');
    const glassCards = document.querySelectorAll('.glass-card-web');
    const sections = document.querySelectorAll('.web-section');

    // Manejo de filtros por categoría
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterValue = pill.getAttribute('data-filter');

            if (filterValue === 'all') {
                familyCards.forEach(card => card.style.display = 'flex');
                glassCards.forEach(card => card.style.display = 'flex');
                sections.forEach(sec => sec.style.display = 'block');
            } else if (filterValue === 'lager' || filterValue === 'ale' || filterValue === 'wild') {
                sections.forEach(sec => sec.style.display = 'block');
                familyCards.forEach(card => {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        card.classList.add('highlight-glow');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('highlight-glow');
                    }
                });

                // Scroll suave a familias
                const famSec = document.getElementById('sec-familias');
                if (famSec) {
                    famSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (filterValue === 'cereales') {
                sections.forEach(sec => sec.style.display = 'block');
                familyCards.forEach(card => card.style.display = 'flex');
                const cerealesSec = document.getElementById('sec-cereales');
                if (cerealesSec) {
                    cerealesSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (filterValue === 'cristaleria') {
                sections.forEach(sec => sec.style.display = 'block');
                familyCards.forEach(card => card.style.display = 'flex');
                const cristSec = document.getElementById('sec-cristaleria');
                if (cristSec) {
                    cristSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Interacción con tarjetas de cristalería
    glassCards.forEach(glass => {
        glass.addEventListener('click', () => {
            const wasActive = glass.classList.contains('active-glass');
            glassCards.forEach(g => g.classList.remove('active-glass'));
            if (!wasActive) {
                glass.classList.add('active-glass');
            }
        });
    });
});
