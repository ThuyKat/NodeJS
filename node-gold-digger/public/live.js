/**
 * Update price live
 * - create an eventSource object
 * - grab the elements by id where dynamic info will be displayed
 * - onmessage callback function: take in event, extract information sent by backend server, update elements with the updated info
 * - on error, log out message to console to let the user know about connection failure
 */
const eventSource = new EventSource('/api');
const liveContainer = document.getElementById('price-display');
const timeContainer = document.getElementById('updated-at');
console.log(liveContainer);
//live price update
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const price = data.price;
  const time = data.time;
  console.log(price);
  liveContainer.textContent = price;
  liveContainer.classList.remove('flash');
  void liveContainer.offsetWidth;
  liveContainer.classList.add('flash');
  timeContainer.textContent = time;
  timeContainer.classList.remove('flash');
  void timeContainer.offsetWidth;
  timeContainer.classList.add('flash');
};
//handle connection lost
eventSource.onerror = () => {
  console.log('Connection lost. Reconnecting...');
};

//handle invest button submit
/*
- Get the form element
- add event listener for when submit is clicked
  - prevent default sending
  - get the input value
  - create formData object to hold the input value
  - in try-catch block, send POST request to server and create response variable to hold the response from server
  - if response.ok, reset form, display message (if any)
  - if error, log out the error by using response.statusText
*/
const form = document.getElementsByTagName('form')[0];
console.log(form);
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputAmount = document.getElementById('investment-amount').value;
  const currentPrice = liveContainer.textContent;
  const currentTime = timeContainer.textContent;
  const formData = {
    amount: inputAmount,
    price: currentPrice,
    time: currentTime,
  };
  try {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      form.reset();
    } else {
      console.error('Server Error:', response.statusText);
    }
  } catch (err) {
    console.error('Error:', err);
  }
});
