document.addEventListener('DOMContentLoaded', () => {
  const thanksList = document.getElementById('thanksList');

  if (!thanksList) return;
  const items = Array.from(thanksList.querySelectorAll('.thanks-item'));
  items.forEach(item => {
    const clone = item.cloneNode(true);
    thanksList.appendChild(clone);
  });
});
