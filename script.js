const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const form = document.getElementById('contactForm');
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox?.querySelector('.lightbox-content img');
const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
const lightboxNext = lightbox?.querySelector('.lightbox-next');
const projectImages = Array.from(document.querySelectorAll('.project-card img'));
let currentIndex = 0;

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const shouldShow = filter === 'all' || filter === category;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

// Lightbox behavior
function openLightbox(index) {
  currentIndex = index;
  const img = projectImages[currentIndex];
  if (!img) return;
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt || '';
  lightboxCaption.textContent = img.alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

function showPrev() {
  currentIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % projectImages.length;
  openLightbox(currentIndex);
}

projectImages.forEach((img, idx) => {
  img.addEventListener('click', () => openLightbox(idx));
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openLightbox(idx);
  });
});

if (lightbox) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  lightbox.querySelector('[data-close]')?.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}



const revealItems = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  window.addEventListener('load', () => {
    setTimeout(() => heroContent.classList.add('reveal'), 250);
  });
}

if (form) {
  function showFormError(input, message) {
    let el = input.parentElement.querySelector('.input-error');
    if (!el) {
      el = document.createElement('div');
      el.className = 'input-error';
      input.parentElement.appendChild(el);
    }
    el.textContent = message;
  }

  function clearFormErrors() {
    form.querySelectorAll('.input-error').forEach((e) => e.remove());
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFormErrors();

    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    let hasError = false;
    if (!name) { showFormError(form.querySelector('[name="name"]'), 'Por favor ingresa tu nombre.'); hasError = true; }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) { showFormError(form.querySelector('[name="email"]'), 'Ingresa un correo válido.'); hasError = true; }
    if (!phone || phone.length < 7) { showFormError(form.querySelector('[name="phone"]'), 'Ingresa un teléfono válido.'); hasError = true; }
    if (!message) { showFormError(form.querySelector('[name="message"]'), 'Agrega una breve descripción de tu idea.'); hasError = true; }

    if (hasError) return;

    const text = `Hola MAARQ Arquitectura.\nNombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/573046086899?text=${encoded}`, '_blank', 'noopener,noreferrer');
    form.reset();
  });
}
