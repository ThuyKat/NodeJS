const hamburger = document.getElementById('hamburger');
const navDropdown = document.getElementById('nav-dropdown');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navDropdown.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  navDropdown.setAttribute('aria-hidden', !isOpen);
});

// Tab switching
const tabs = document.querySelectorAll('#tab-list .tab');
const searchBar = document.querySelector('.search-bar');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    searchBar.placeholder = tab.dataset.placeholder;
    searchBar.focus();
  });
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navDropdown.contains(e.target)) {
    hamburger.classList.remove('open');
    navDropdown.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navDropdown.setAttribute('aria-hidden', 'true');
  }
});
