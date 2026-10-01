// BURDEN GHOST site behavior. Kept in a same-origin file so CSP can disallow inline scripts.
(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('contact-form');
  const started = document.getElementById('form-started');
  const status = document.getElementById('contact-status');
  if (form && started) {
    const startTime = Date.now();
    started.value = String(startTime);
    form.addEventListener('submit', function (event) {
      if (Date.now() - startTime < 2500) {
        event.preventDefault();
        if (status) status.textContent = document.documentElement.lang === 'es'
          ? 'Espera un momento antes de enviar el mensaje.'
          : 'Please wait a moment before sending your message.';
        return;
      }
      const token = form.querySelector('input[name="cf-turnstile-response"]')?.value;
      if (!token) {
        event.preventDefault();
        if (status) status.textContent = document.documentElement.lang === 'es'
          ? 'Completa la verificación de seguridad antes de enviar.'
          : 'Please complete the security verification before sending.';
      }
    });

    window.formspree = window.formspree || function () {
      (window.formspree.q = window.formspree.q || []).push(arguments);
    };
    window.formspree('initForm', {
      formElement: '#contact-form',
      formId: 'mgavzzyq',
      onSubmit: ({ form: submittedForm }) => {
        const message = document.getElementById('contact-status');
        if (message) message.textContent = document.documentElement.lang === 'es'
          ? 'Enviando tu mensaje...' : 'Sending your message...';
        const button = submittedForm.querySelector('button[type="submit"]');
        if (button) button.textContent = document.documentElement.lang === 'es' ? 'ENVIANDO...' : 'SENDING...';
      },
      onSuccess: () => { window.location.href = 'thank-you.html'; },
      onError: ({ form: submittedForm }, error) => {
        const message = document.getElementById('contact-status');
        if (message) message.textContent = error?.message || (document.documentElement.lang === 'es'
          ? 'Revisa los campos del formulario.' : 'Please check the form fields.');
      },
      onFailure: () => {
        const message = document.getElementById('contact-status');
        if (message) message.textContent = document.documentElement.lang === 'es'
          ? 'No se pudo enviar el mensaje. Inténtalo de nuevo.'
          : 'The message could not be sent. Please try again.';
        if (window.turnstile && typeof window.turnstile.reset === 'function') window.turnstile.reset();
        const button = document.querySelector('#contact-form button[type="submit"]');
        if (button) button.textContent = document.documentElement.lang === 'es' ? 'ENVIAR MENSAJE' : 'SEND MESSAGE';
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

    function setLanguage(next, remember = true) {
      language = next === 'es' ? 'es' : 'en';
      if (remember) {
        try { localStorage.setItem(storageKey, language); } catch (_) {}
      }
      document.documentElement.lang = language;
      document.querySelectorAll('[data-en][data-es]').forEach(element => {
        element.innerHTML = language === 'es' ? element.dataset.es : element.dataset.en;
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
