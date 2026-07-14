const header = document.querySelector('.site-header');
const reveals = document.querySelectorAll('.reveal');
const year = document.getElementById('year');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
const projectCards = document.querySelectorAll('.project-card');

if (year) {
  year.textContent = new Date().getFullYear();
}

let currentHeroSlide = 0;
let heroRotation;

const showHeroSlide = (index) => {
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === index);
  });
};

const startHeroSlideshow = () => {
  clearInterval(heroRotation);
  if (heroSlides.length > 1) {
    heroRotation = window.setInterval(() => {
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      showHeroSlide(currentHeroSlide);
    }, 5000);
  }
};

if (heroSlides.length > 0) {
  showHeroSlide(currentHeroSlide);
  startHeroSlideshow();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(heroRotation);
    } else {
      startHeroSlideshow();
    }
  });
}

projectCards.forEach((card) => {
  const video = card.querySelector('.project-video');
  const previewArea = card.querySelector('.project-media');
  if (!video || !previewArea) {
    return;
  }

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.preload = 'auto';

  const playPreview = async () => {
    try {
      if (video.readyState < 2) {
        video.load();
      }

      video.currentTime = 0;
      await video.play();
    } catch (error) {
      // La reproducción puede quedar bloqueada hasta que el navegador lo permita.
    }
  };

  const pausePreview = () => {
    video.pause();
    video.currentTime = 0;
  };

  previewArea.addEventListener('mouseenter', playPreview);
  previewArea.addEventListener('mouseleave', pausePreview);
  previewArea.addEventListener('focusin', playPreview);
  previewArea.addEventListener('focusout', pausePreview);
  previewArea.addEventListener('touchstart', playPreview, { passive: true });

  card.addEventListener('mouseenter', playPreview);
  card.addEventListener('mouseleave', pausePreview);
  card.addEventListener('focusin', playPreview);
  card.addEventListener('focusout', pausePreview);

});

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
