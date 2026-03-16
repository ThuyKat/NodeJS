/**** front end code****/
try {
  const data = await fetch('/api');
  const response = await data.json();
  renderPage(response);
} catch (err) {
  console.log(err);
}

/**
 * Renders the fetched backend data into the page.
 *
 * @param {any} dataResponse - The data received from the /api endpoint
 * @returns {void}
 */
function renderPage(dataResponse) {
  const container = document.getElementById('data-from-backend');
  let htmlContent = `
  <h1>This is my message sent from backend</h1>
  <p class="data-text">${dataResponse}</p>
  `;
  container.innerHTML = htmlContent;
}

/**** ends *****/
