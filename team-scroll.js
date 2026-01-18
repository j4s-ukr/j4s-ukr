document.addEventListener('DOMContentLoaded', () => {
  const teamGrid = document.getElementById('teamGrid');
  
  if (!teamGrid) return;
  const members = Array.from(teamGrid.querySelectorAll('.team-member'));
  members.forEach(member => {
    const clone = member.cloneNode(true);
    teamGrid.appendChild(clone);
  });
});
