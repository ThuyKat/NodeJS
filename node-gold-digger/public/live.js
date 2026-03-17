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
