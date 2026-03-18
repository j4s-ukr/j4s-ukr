(() => {
  const MOBILE_BREAKPOINT = 768;

  function closeMenu(header) {
    const button = header.querySelector('.site-menu-toggle');
    if (!button) return;

    header.classList.remove('menu-open');
    button.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu(header) {
    const button = header.querySelector('.site-menu-toggle');
    if (!button) return;

    const isOpen = header.classList.toggle('menu-open');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.site-header');

    headers.forEach((header) => {
      const button = header.querySelector('.site-menu-toggle');
      const menuLinks = header.querySelectorAll('.mobile-menu-link');
      const homeLinks = header.querySelectorAll('a[href="#top"]');

      if (!button) return;

      button.addEventListener('click', () => {
        toggleMenu(header);
      });

      menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
          closeMenu(header);
        });
      });

      homeLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          closeMenu(header);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });

      document.addEventListener('click', (event) => {
        if (!header.contains(event.target)) {
          closeMenu(header);
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        headers.forEach((header) => closeMenu(header));
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        headers.forEach((header) => closeMenu(header));
      }
    });
  });
})();
