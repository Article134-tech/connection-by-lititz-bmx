(() => {
  const boot = document.getElementById('boot');
  const bootStatus = document.getElementById('boot-status');
  const main = document.getElementById('connection');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasBooted = sessionStorage.getItem('connectionBooted') === '1';
  const delay = reduceMotion ? 50 : (hasBooted ? 450 : 1650);

  // Returning from another app should restore the Connection home screen,
  // not the previous scroll position or a cached launch overlay.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  if (hasBooted) {
    bootStatus.textContent = 'Waking Connection…';
  } else {
    setTimeout(() => { bootStatus.textContent = 'Loading applications…'; }, 450);
    setTimeout(() => { bootStatus.textContent = 'Ready.'; }, 1150);
  }

  setTimeout(() => {
    boot.classList.add('is-hidden');
    sessionStorage.setItem('connectionBooted', '1');
    main.focus({preventScroll:true});
  }, delay);

  const resume = document.getElementById('resume');
  const resumeLink = document.getElementById('resume-link');
  const clearResume = document.getElementById('clear-resume');

  function showResume() {
    try {
      const last = JSON.parse(localStorage.getItem('connectionLastApp'));
      if (last && last.name && last.url) {
        resume.hidden = false;
        resumeLink.textContent = last.name;
        resumeLink.href = last.url;
      }
    } catch (_) {}
  }

  clearResume.addEventListener('click', () => {
    localStorage.removeItem('connectionLastApp');
    resume.hidden = true;
  });

  document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const name = card.dataset.app;
      const url = card.href;
      localStorage.setItem('connectionLastApp', JSON.stringify({name, url, savedAt: Date.now()}));
      card.classList.add('is-launching');

      const overlay = document.createElement('div');
      overlay.className = 'launch-overlay';
      overlay.setAttribute('role', 'status');
      overlay.innerHTML = `<strong>Opening ${name}</strong>`;
      document.body.appendChild(overlay);

      setTimeout(() => { window.location.assign(url); }, reduceMotion ? 50 : 460);
    });
  });

  function restoreConnectionHome() {
    document.querySelectorAll('.launch-overlay').forEach(overlay => overlay.remove());
    document.querySelectorAll('.app-card.is-launching').forEach(card => {
      card.classList.remove('is-launching');
    });
    showResume();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'auto'});
        main.focus({preventScroll: true});
      });
    });
  }

  window.addEventListener('pageshow', event => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const returnedByBackButton = event.persisted || navigation?.type === 'back_forward';
    if (returnedByBackButton) {
      restoreConnectionHome();
    }
  });

  showResume();

  let deferredPrompt;
  const installButton = document.getElementById('install-button');
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.hidden = false;
  });
  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButton.hidden = true;
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js', {updateViaCache:'none'}));
  }
})();