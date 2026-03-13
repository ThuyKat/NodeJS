/**** front end code****/
const response = await fetch('https://example.org/post', {
  method: 'POST',
  body: JSON.stringify({ username: 'kat_1' }),
  headers: {
    'Content-Type': 'application/json',
  },
});
/**** ends *****/
