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
