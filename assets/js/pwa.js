/**
 * pwa.js - Registro de Service Worker, control de instalación e integración PWA
 * Cultura Chelera
 */

(function () {
  'use strict';

  let deferredPrompt = null;

  // 1. Registro seguro del Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Determinar la ruta relativa o absoluta de sw.js
      const swUrl = '/sw.js';

      navigator.serviceWorker
        .register(swUrl)
        .then((reg) => {
          // Si hay una actualización esperando, permitir que tome el control
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('Cultura Chelera: Nueva versión disponible.');
                }
              });
            }
          });
        })
        .catch((err) => {
          // Fallback en caso de rutas relativas si no está en raíz
          navigator.serviceWorker
            .register('./sw.js')
            .catch((e) => console.log('PWA SW no disponible en este entorno:', e));
        });
    });
  }

  // 2. Manejo del evento beforeinstallprompt (activador oficial de instalación PWA)
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir el banner automático intrusivo para controlar la experiencia
    e.preventDefault();
    deferredPrompt = e;

    // Mostrar todos los botones de instalación configurados en la interfaz
    showInstallButtons();
  });

  // 3. Función para mostrar botones de instalación
  function showInstallButtons() {
    const installBtns = document.querySelectorAll('#pwaInstallBtn, .pwa-install-btn');
    installBtns.forEach((btn) => {
      btn.style.display = 'flex';
      if (btn.hasAttribute('hidden')) {
        btn.removeAttribute('hidden');
      }
      btn.classList.add('is-ready');

      // Evitar agregar listeners duplicados
      if (!btn.dataset.pwaBound) {
        btn.dataset.pwaBound = 'true';
        btn.addEventListener('click', (evt) => {
          evt.preventDefault();
          window.promptPWAInstall();
        });
      }
    });
  }

  // 4. Método público para disparar la instalación
  window.promptPWAInstall = async function () {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('El usuario aceptó instalar Cultura Chelera');
      } else {
        console.log('El usuario declinó la instalación');
      }
      deferredPrompt = null;
      hideInstallButtons();
    } else {
      // Detección de iOS Safari donde no hay evento beforeinstallprompt
      const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
      const isInStandalone = ('standalone' in window.navigator) && window.navigator.standalone;

      if (isIos && !isInStandalone) {
        alert(
          '📱 Para instalar Cultura Chelera en tu iPhone o iPad:\n\n' +
          '1. Toca el botón "Compartir" (ícono con flecha hacia arriba) en Safari.\n' +
          '2. Selecciona "Agregar al inicio" (Add to Home Screen).\n' +
          '3. Pulsa "Agregar" arriba a la derecha.'
        );
      } else if (isInStandalone || window.matchMedia('(display-mode: standalone)').matches) {
        alert('🎉 ¡Cultura Chelera ya está instalada en tu dispositivo!');
      } else {
        alert(
          '💡 Para instalar esta app:\n\n' +
          'Abre el menú de tu navegador (los tres puntos ⋮ arriba a la derecha) y selecciona "Instalar aplicación" o "Agregar a la pantalla principal".'
        );
      }
    }
  };

  // 5. Ocultar botones cuando ya está instalada
  function hideInstallButtons() {
    const installBtns = document.querySelectorAll('#pwaInstallBtn, .pwa-install-btn');
    installBtns.forEach((btn) => {
      btn.style.display = 'none';
    });
  }

  // 6. Evento de instalación exitosa
  window.addEventListener('appinstalled', () => {
    console.log('🎉 Cultura Chelera PWA instalada exitosamente.');
    hideInstallButtons();
    deferredPrompt = null;
  });

  // 7. Si ya corre en modo standalone, ocultar botones de inicio
  if (window.matchMedia('(display-mode: standalone)').matches || ('standalone' in window.navigator && window.navigator.standalone)) {
    hideInstallButtons();
  }
})();
