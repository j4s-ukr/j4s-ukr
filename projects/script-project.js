window.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });

  initGuideTabs();
  initProgressToggle();
  initGalleryLightbox();
});

function initProgressToggle() {
  const mainProgress = document.getElementById('mainProgressBtn');
  const detailedProgress = document.getElementById('detailedProgress');
  const collapseBtn = document.getElementById('collapseBtn');

  if (!mainProgress || !detailedProgress || !collapseBtn) {
    return;
  }

  mainProgress.addEventListener('click', () => {
    detailedProgress.classList.toggle('expanded');
  });

  collapseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    detailedProgress.classList.remove('expanded');
  });
}

function initGuideTabs() {
  const tabButtons = document.querySelectorAll('.guide-tab-btn');
  const tabContents = document.querySelectorAll('.guide-tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}


function initGalleryLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const galleryImages = document.querySelectorAll('.gallery-img');

  if (!lightbox || !lightboxImg || !lightboxClose || !lightboxPrev || !lightboxNext || galleryImages.length === 0) {
    return;
  }

  let currentImageIndex = 0;
  let lastFocusedImage = null;
  let touchStartX = 0;
  let touchEndX = 0;

  function updateLightboxContent(index) {
    const activeImage = galleryImages[index];

    lightboxImg.src = activeImage.src;
    lightboxImg.alt = activeImage.alt;

    if (lightboxCaption) {
      lightboxCaption.textContent = activeImage.alt;
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${galleryImages.length}`;
    }
  }

  function showImage(index) {
    currentImageIndex = (index + galleryImages.length) % galleryImages.length;
    updateLightboxContent(currentImageIndex);
  }

  function openLightbox(index) {
    lastFocusedImage = galleryImages[index];
    showImage(index);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      lightbox.classList.add('show');
    }, 10);
    document.body.classList.add('lightbox-open');
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      lightbox.classList.remove('active');
      document.body.classList.remove('lightbox-open');
      lightboxImg.src = '';
    }, 350);

    if (lastFocusedImage) {
      lastFocusedImage.focus();
    }
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentImageIndex - 1);
  });

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentImageIndex + 1);
  });

  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;

    if (Math.abs(touchEndX - touchStartX) < 40) {
      return;
    }

    if (touchEndX < touchStartX) {
      showImage(currentImageIndex + 1);
      return;
    }

    showImage(currentImageIndex - 1);
  }, { passive: true });

  if (galleryImages.length < 2) {
    lightboxPrev.hidden = true;
    lightboxNext.hidden = true;
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') {
      showImage(currentImageIndex - 1);
    }
    if (e.key === 'ArrowRight') {
      showImage(currentImageIndex + 1);
    }
    if (e.key === 'Escape') closeLightbox();
  });
}
