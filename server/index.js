import http from 'node:http';
import { getData } from './seed.js';
let PORT = 9000;

const server = http.createServer(async (req, res) => {
  let myData = await getData();
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(myData));
});
server.listen(PORT, () => {
  console.log('Server listening from port:', PORT);
});
