//fetch gold price from server
try {
  const response = await fetch('/api');
  const data = await response.json();
  updateDisplayPrice(JSON.stringify(data));
} catch (err) {
  console.log(err);
}

function updateDisplayPrice(data) {
  const priceDisplayEl = document.getElementById('price-display');
  console.log(priceDisplayEl);
  priceDisplayEl.textContent = data;
}
