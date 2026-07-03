const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const form = document.getElementById('contactForm');
const heroMediaItems = document.querySelectorAll('.hero-media');

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

if (heroMediaItems.length > 1) {
  let heroIndex = 0;

  setInterval(() => {
    heroMediaItems[heroIndex].classList.remove('hero-media--active');
    heroIndex = (heroIndex + 1) % heroMediaItems.length;
    heroMediaItems[heroIndex].classList.add('hero-media--active');
  }, 7000);
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
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    const text = `Hola MAARQ Arquitectura.\nNombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/573046086899?text=${encoded}`, '_blank', 'noopener,noreferrer');
    form.reset();
  });
}
