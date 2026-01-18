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
});

function initProgressToggle() {
  const mainProgress = document.getElementById('mainProgressBtn');
  const detailedProgress = document.getElementById('detailedProgress');
  const collapseBtn = document.getElementById('collapseBtn');

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

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryImages = document.querySelectorAll('.gallery-slider img');

let currentImageIndex = 0;

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentImageIndex = index;
    openLightbox(img.src);
  });
});

function openLightbox(imageSrc) {
  lightboxImg.src = imageSrc;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.classList.add('closing');
  
  setTimeout(() => {
    lightbox.classList.remove('closing');
    document.body.style.overflow = '';
  }, 400);
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImageIndex].src;
});

lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImageIndex].src;
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'ArrowLeft') {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
  }
  if (e.key === 'ArrowRight') {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
  }
  if (e.key === 'Escape') closeLightbox();
});
