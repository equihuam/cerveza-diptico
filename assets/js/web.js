/**
 * web.js - Interacciones fluidas para la experiencia web mobile-first
 */

document.addEventListener('DOMContentLoaded', () => {
    const filterPills = document.querySelectorAll('.filter-pill');
    const familyCards = document.querySelectorAll('.family-card-web');
    const glassCards = document.querySelectorAll('.glass-card-web');
    const sections = document.querySelectorAll('.web-section');

    // Manejo de filtros generales por categoría
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
            } else if (filterValue === 'glosario') {
                sections.forEach(sec => sec.style.display = 'block');
                familyCards.forEach(card => card.style.display = 'flex');
                const glosarioSec = document.getElementById('sec-glosario');
                if (glosarioSec) {
                    glosarioSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    // =========================================================================
    // Lógica Interactiva del Glosario (Filtro por Categorías + Búsqueda Rápida)
    // =========================================================================
    const glossarySearch = document.getElementById('glossary-search');
    const glossaryTabBtns = document.querySelectorAll('.glossary-tab-btn');
    const glossaryCards = document.querySelectorAll('.glossary-card');
    const glossaryEmptyState = document.getElementById('glossary-empty');

    let currentCategory = 'all';
    let currentSearchTerm = '';

    function filterGlossary() {
        let visibleCount = 0;

        glossaryCards.forEach(card => {
            const cardCat = card.getAttribute('data-glossary-cat') || '';
            const cardText = card.textContent.toLowerCase();

            const matchesCategory = (currentCategory === 'all' || cardCat === currentCategory);
            const matchesSearch = currentSearchTerm === '' || cardText.includes(currentSearchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (glossaryEmptyState) {
            glossaryEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    if (glossarySearch) {
        glossarySearch.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.trim().toLowerCase();
            filterGlossary();
        });
    }

    glossaryTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            glossaryTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-tab') || 'all';
            filterGlossary();
        });
    });
});

