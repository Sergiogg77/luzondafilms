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
  video.autoplay = false;
  video.loop = true;
  video.volume = 0;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.preload = 'auto';
  video.load();

  let isInteracting = false;

  const showVideo = () => {
    isInteracting = true;
    video.currentTime = 0;
    video.style.opacity = '1';
    video.style.transform = 'scale(1.02)';
    video.style.zIndex = '2';
    video.style.visibility = 'visible';
    card.classList.add('is-video-playing');

    const startPlayback = () => {
      if (!isInteracting || !video.paused) {
        return;
      }

      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          isInteracting = false;
        });
      }
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('canplay', startPlayback, { once: true });
      video.addEventListener('loadeddata', startPlayback, { once: true });
    }
  };

  const hideVideo = () => {
    isInteracting = false;

    if (!video.paused) {
      video.pause();
    }

    video.currentTime = 0;
    video.style.opacity = '0';
    video.style.transform = 'scale(1.03)';
    video.style.zIndex = '0';
    video.style.visibility = 'hidden';
    card.classList.remove('is-video-playing');
  };

  previewArea.addEventListener('mouseenter', showVideo);
  previewArea.addEventListener('mouseleave', hideVideo);
  previewArea.addEventListener('pointerenter', showVideo);
  previewArea.addEventListener('pointerleave', hideVideo);
  previewArea.addEventListener('focusin', showVideo);
  previewArea.addEventListener('focusout', hideVideo);
  previewArea.addEventListener('touchstart', showVideo, { passive: true });
  previewArea.addEventListener('touchend', hideVideo, { passive: true });
  previewArea.addEventListener('touchcancel', hideVideo, { passive: true });
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
