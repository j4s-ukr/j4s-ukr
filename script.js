const phrases = [
  'Українська локалізація ігор',
  'Грай в улюблені ігри українською',
  'Локалізація з душею та увагою до деталей',
  'Українська - мова гравців',
  'Грай українською разом з нами'
];

let currentPhraseIndex = 0;
const heroRotating = document.querySelector('.hero-rotating');

function rotatePhrase() {
  // Fade out and slide up
  heroRotating.style.opacity = '0';
  heroRotating.style.transform = 'translateY(-20px)';
  
  setTimeout(() => {
    // Change text
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    heroRotating.textContent = phrases[currentPhraseIndex];
    
    // Reset position for slide in from bottom
    heroRotating.style.transform = 'translateY(20px)';
    
    // Fade in and slide to center
    setTimeout(() => {
      heroRotating.style.opacity = '1';
      heroRotating.style.transform = 'translateY(0)';
    }, 50);
  }, 500);
}

// Set initial text and state
heroRotating.textContent = phrases[0];
heroRotating.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
heroRotating.style.opacity = '0';
heroRotating.style.transform = 'translateY(20px)';

// Animate in on page load with delay
setTimeout(() => {
  heroRotating.style.opacity = '1';
  heroRotating.style.transform = 'translateY(0)';
}, 300);

// Start rotation after initial delay
setTimeout(() => {
  rotatePhrase();
  setInterval(rotatePhrase, 4000);
}, 3300);

const btn = document.querySelector('.hero-btn');

btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  btn.style.transform = `scale(1.07) translate(${x*6}px, ${y*6}px)`;
});

btn.addEventListener('mouseleave', () => {
  btn.style.transform = '';
});

const logoWrapper = document.querySelector('.logo-wrapper');
const hero = document.querySelector('.hero');

setTimeout(() => {
  logoWrapper.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  
  hero.addEventListener('mousemove', (e) => {
    const rect = logoWrapper.getBoundingClientRect();
    const logoCenterX = rect.left + rect.width / 2;
    const logoCenterY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - logoCenterX;
    const deltaY = e.clientY - logoCenterY;
    
    let rotateX = (deltaY / rect.height) * -8;
    let rotateY = (deltaX / rect.width) * 8;
    
    rotateX = Math.max(-8, Math.min(8, rotateX));
    rotateY = Math.max(-8, Math.min(8, rotateY));
    
    logoWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    logoWrapper.style.transition = 'transform 0.3s ease-out';
  });

  hero.addEventListener('mouseleave', () => {
    logoWrapper.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    logoWrapper.style.transition = 'transform 0.8s ease-out';
  });
}, 1800);

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (isTouchDevice) {
  const supportBtn = document.querySelector('.support-btn');
  const sternenkoBtn = document.querySelector('.sternenko-btn');
  
  function handleButtonTouch(button, e) {
    if (!button.classList.contains('expanded')) {
      e.preventDefault();
      button.classList.add('expanded');
      
      setTimeout(() => {
        document.addEventListener('touchstart', function closeButton(event) {
          if (!button.contains(event.target)) {
            button.classList.remove('expanded');
            document.removeEventListener('touchstart', closeButton);
          }
        });
      }, 100);
    }
  }
  
  if (supportBtn) {
    supportBtn.addEventListener('touchstart', function(e) {
      handleButtonTouch(supportBtn, e);
    });
  }
  
  if (sternenkoBtn) {
    sternenkoBtn.addEventListener('touchstart', function(e) {
      handleButtonTouch(sternenkoBtn, e);
    });
  }
}

const teamToggle = document.getElementById('teamToggle');
const teamContent = document.getElementById('teamContent');

if (teamToggle && teamContent) {
  teamToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    teamContent.classList.toggle('expanded');
    
    const span = this.querySelector('span');
    if (teamContent.classList.contains('expanded')) {
      span.textContent = 'Сховати команду';
    } else {
      span.textContent = 'Показати команду';
    }
  });
}
