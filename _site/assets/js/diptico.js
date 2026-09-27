/* ==========================================================================
   Díptico Editorial Interactivo: Taxonomía de la Cerveza
   Manejo de interactividad, filtros de familias, sincronización de copas
   y alternancia de modos de visualización.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFamilyFilters();
  initGlasswareSync();
  initStyleTooltips();
  initPrintButton();
  initViewSwitcher();
});

/**
 * Filtro interactivo por familias de fermentación
 */
function initFamilyFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const familyCards = document.querySelectorAll('.family-card');
  const branches = document.querySelectorAll('.branch');
  const glassItems = document.querySelectorAll('.glass-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const family = btn.getAttribute('data-family');

      // Actualizar botón activo
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filtrar tarjetas de familias
      familyCards.forEach(card => {
        if (family === 'all' || card.classList.contains(family)) {
          card.style.display = '';
          card.classList.remove('dimmed');
        } else {
          card.classList.add('dimmed');
        }
      });

      // Filtrar ramas de estilos
      branches.forEach(branch => {
        if (family === 'all' || branch.classList.contains(`branch-${family}`)) {
          branch.style.display = '';
          branch.classList.remove('dimmed');
        } else {
          branch.classList.add('dimmed');
        }
      });

      // Resaltar cristalería asociada
      glassItems.forEach(item => {
        const itemFam = item.getAttribute('data-family');
        if (family === 'all' || !itemFam || itemFam.includes(family)) {
          item.classList.remove('dimmed');
        } else {
          item.classList.add('dimmed');
        }
      });
    });
  });
}

/**
 * Sincronización visual entre estilos y cristalería al interactuar
 */
function initGlasswareSync() {
  const styleItems = document.querySelectorAll('.styles-grid li');
  const glassItems = document.querySelectorAll('.glass-item');

  styleItems.forEach(item => {
    const glassTarget = item.getAttribute('data-glass');

    item.addEventListener('mouseenter', () => {
      if (!glassTarget) return;
      glassItems.forEach(g => {
        if (g.getAttribute('data-glass-id') === glassTarget) {
          g.classList.add('highlighted');
        } else {
          g.classList.add('dimmed-subtle');
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      glassItems.forEach(g => {
        g.classList.remove('highlighted', 'dimmed-subtle');
      });
    });
  });
}

/**
 * Tooltips interactivos y datos sensoriales de estilos y cereales
 */
function initStyleTooltips() {
  const grainBadges = document.querySelectorAll('.grain-tag');
  grainBadges.forEach(badge => {
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      badge.classList.toggle('expanded');
    });
  });
}

/**
 * Botón de impresión a PDF
 */
function initPrintButton() {
  const printBtn = document.getElementById('btn-print-diptico');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/**
 * Selector de Modo de Visualización (Díptico Folleto vs Pantalla Continua)
 */
function initViewSwitcher() {
  const viewToggle = document.querySelectorAll('.view-toggle-btn');
  const container = document.querySelector('.diptico-container');

  if (!viewToggle.length || !container) return;

  viewToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-view-mode');
      viewToggle.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (mode === 'reading') {
        container.classList.add('reading-mode');
      } else {
        container.classList.remove('reading-mode');
      }
    });
  });
}
