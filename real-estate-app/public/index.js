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

// Search
const searchBtn = document.querySelector('.buttons button:last-child');
const productContainer = document.getElementById('product-container');

searchBtn.addEventListener('click', fetchListings);

async function fetchListings() {
  const activeTab = document.querySelector('#tab-list .tab.active');
  const listingType = activeTab.textContent.trim().toLowerCase();

  if (!['buy', 'rent', 'sold'].includes(listingType)) {
    productContainer.innerHTML = '<p class="no-results">Search not supported for this tab yet.</p>';
    return;
  }

  const apiUrl = `/api/${listingType}${window.location.search}`;

  productContainer.innerHTML = '<p class="loading">Loading...</p>';

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    renderListings(data.listings);
  } catch (err) {
    productContainer.innerHTML = '<p class="no-results">Failed to load listings.</p>';
  }
}

function renderListings(listings) {
  if (!listings.length) {
    productContainer.innerHTML = '<p class="no-results">No listings found.</p>';
    return;
  }

  productContainer.innerHTML = listings
    .map(
      (l) => `
    <div class="listing-card">
      <div class="listing-img-wrapper">
        <img src="${l.image}" alt="${l.address}" loading="lazy" />
        <span class="listing-badge listing-badge--${l.listingType}">${l.listingType.toUpperCase()}</span>
      </div>
      <div class="listing-info">
        <div class="listing-price">${formatPrice(l)}</div>
        <div class="listing-address">${l.address}</div>
        <div class="listing-meta">
          <span>${l.bedrooms} bed</span>
          <span>${l.bathrooms} bath</span>
          <span>${l.parking} car</span>
          ${l.landSize ? `<span>${l.landSize}m²</span>` : ''}
        </div>
        <p class="listing-desc">${l.description}</p>
      </div>
    </div>`
    )
    .join('');
}

function formatPrice(l) {
  if (l.listingType === 'rent') return `$${l.price.toLocaleString()} / week`;
  return `$${l.price.toLocaleString()}`;
}
