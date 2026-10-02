// BURDEN GHOST site behavior. Kept in a same-origin file so CSP can disallow inline scripts.
(function () {
  'use strict';

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('contact-form');
  const started = document.getElementById('form-started');
  const status = document.getElementById('contact-status');

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  function setSubmitState(button, submitting, language) {
    if (!button) return;
    button.disabled = submitting;
    button.setAttribute('aria-disabled', String(submitting));
    button.textContent = submitting
      ? (language === 'es' ? 'ENVIANDO...' : 'SENDING...')
      : (language === 'es' ? 'ENVIAR MENSAJE' : 'SEND MESSAGE');
  }

  if (form && started) {
    const startTime = Date.now();
    started.value = String(startTime);

    form.addEventListener('submit', async function (event) {
      const language = document.documentElement.lang === 'es' ? 'es' : 'en';
      const button = form.querySelector('button[type="submit"]');

      if (Date.now() - startTime < 2500) {
        event.preventDefault();
        setStatus(language === 'es'
          ? 'Espera un momento antes de enviar el mensaje.'
          : 'Please wait a moment before sending your message.');
        return;
      }

      const token = form.querySelector('input[name="cf-turnstile-response"]')?.value;
      if (!token) {
        event.preventDefault();
        setStatus(language === 'es'
          ? 'Completa la verificación de seguridad antes de enviar.'
          : 'Please complete the security verification before sending.');
        return;
      }

      // Use Formspree directly from the native form data. This removes the
      // third-party @formspree/ajax runtime while retaining Turnstile support.
      event.preventDefault();
      if (button?.disabled) return;

      setSubmitState(button, true, language);
      setStatus(language === 'es' ? 'Enviando tu mensaje...' : 'Sending your message...');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
          credentials: 'omit'
        });

        let result = null;
        try {
          result = await response.json();
        } catch (_) {}

        if (!response.ok) {
          const errorMessage = result?.errors?.map(error => error.message).filter(Boolean).join(' ')
            || (language === 'es'
              ? 'No se pudo enviar el mensaje. Revisa los campos e inténtalo de nuevo.'
              : 'The message could not be sent. Please check the fields and try again.');
          throw new Error(errorMessage);
        }

        window.location.href = 'thank-you.html';
      } catch (error) {
        setStatus(error?.message || (language === 'es'
          ? 'No se pudo enviar el mensaje. Inténtalo de nuevo.'
          : 'The message could not be sent. Please try again.'));
        setSubmitState(button, false, language);
        if (window.turnstile && typeof window.turnstile.reset === 'function') {
          window.turnstile.reset();
        }
      }
    });
  }

  (function () {
    const storageKey = 'burdenGhostLanguage';
    let savedLanguage = null;
    try { savedLanguage = localStorage.getItem(storageKey); } catch (_) {}
    const browserLanguage = (navigator.language || 'en').toLowerCase();
    let language = (savedLanguage === 'en' || savedLanguage === 'es')
      ? savedLanguage : (browserLanguage.startsWith('es') ? 'es' : 'en');

    function setLocalizedContent(element, value) {
      // Translation strings are site-authored data. Build the DOM explicitly so
      // future changes cannot accidentally turn a translation value into HTML.
      const fragment = document.createDocumentFragment();
      const parts = String(value).split(/(<br\s*\/?>)/gi);
      for (const part of parts) {
        if (/^<br\s*\/?>$/i.test(part)) {
          fragment.appendChild(document.createElement('br'));
        } else if (part) {
          fragment.appendChild(document.createTextNode(part));
        }
      }
      element.replaceChildren(fragment);
    }

    function setLanguage(next, remember = true) {
      language = next === 'es' ? 'es' : 'en';
      if (remember) {
        try { localStorage.setItem(storageKey, language); } catch (_) {}
      }
      document.documentElement.lang = language;
      document.querySelectorAll('[data-en][data-es]').forEach(element => {
        setLocalizedContent(element, language === 'es' ? element.dataset.es : element.dataset.en);
      });
      const button = document.getElementById('langToggle');
      if (button) {
        button.textContent = language === 'en' ? 'ES' : 'EN';
        button.setAttribute('aria-label', language === 'en' ? 'Cambiar a español' : 'Switch to English');
        button.setAttribute('title', language === 'en' ? 'Cambiar a español' : 'Switch to English');
      }
    }

    const button = document.getElementById('langToggle');
    if (button) button.addEventListener('click', () => setLanguage(language === 'en' ? 'es' : 'en', true));
    setLanguage(language, false);
  })();
})();
