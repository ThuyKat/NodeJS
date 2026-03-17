const eventSource = new EventSource('/api/live');

const liveContainer = document.getElementById('price-display');

//live price update
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const price = data.price;
  console.log(price);
  liveContainer.textContent = price;
};
//handle connection lost
eventSource.onerror = () => {
  console.log('Connection lost. Reconnecting...');
};
