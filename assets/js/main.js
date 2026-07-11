const header = document.querySelector('.site-header');
const reveals = document.querySelectorAll('.reveal');
const year = document.getElementById('year');
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (year) {
  year.textContent = new Date().getFullYear();
}

const handleScroll = () => {
  if (window.scrollY > 20) {
    header?.classList.add('is-sticky');
  } else {
    header?.classList.remove('is-sticky');
  }

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 220) {
    scrollTopBtn?.classList.add('is-visible');
  } else {
    scrollTopBtn?.classList.remove('is-visible');
  }

  reveals.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) {
      item.classList.add('is-visible');
    }
  });
};

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('load', handleScroll);
