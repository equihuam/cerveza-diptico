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

    // =========================================================================
    // Lógica del Menú Flotante Colapsable de Navegación Rápida (2 Columnas)
    // =========================================================================
    const quickDock = document.getElementById('quickDock');
    const dockToggleBtn = document.getElementById('dockToggleBtn');
    const dockGridContainer = document.getElementById('dockGridContainer');

    if (quickDock && dockToggleBtn && dockGridContainer) {
        function openDock() {
            quickDock.classList.add('is-open');
            dockToggleBtn.setAttribute('aria-expanded', 'true');
            dockToggleBtn.setAttribute('aria-label', 'Cerrar menú de navegación rápida');
            dockGridContainer.removeAttribute('hidden');
        }

        function closeDock() {
            quickDock.classList.remove('is-open');
            dockToggleBtn.setAttribute('aria-expanded', 'false');
            dockToggleBtn.setAttribute('aria-label', 'Abrir menú de navegación rápida');
            dockGridContainer.setAttribute('hidden', '');
        }

        function toggleDock() {
            const isOpen = quickDock.classList.contains('is-open');
            if (isOpen) {
                closeDock();
            } else {
                openDock();
            }
        }

        dockToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDock();
        });

        // Cerrar al hacer clic en un enlace interno con scroll suave
        const dockItems = quickDock.querySelectorAll('.dock-item');
        dockItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetId = item.getAttribute('data-dock-target');
                if (targetId) {
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        closeDock();
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        history.pushState(null, '', `#${targetId}`);
                    }
                } else {
                    closeDock();
                }
            });
        });

        // Cerrar con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && quickDock.classList.contains('is-open')) {
                closeDock();
                dockToggleBtn.focus();
            }
        });

        // Cerrar al hacer clic fuera del menú
        document.addEventListener('click', (e) => {
            if (quickDock.classList.contains('is-open') && !quickDock.contains(e.target)) {
                closeDock();
            }
        });
    }
});


