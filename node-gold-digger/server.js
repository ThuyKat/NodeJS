//create server
import http from 'http';
import path from 'path';
import fs from 'fs/promises';
import getData from './utils/getData.js';
import getFileType from './utils/getFileType.js';
import sendResponse from './utils/sendResponse.js';

const PORT = 9000;
const server = http.createServer(async (req, res) => {
  if (req.url === '/api') {
    //serve data if GET method
    if (req.method === 'GET') {
      const data = await getData(); //JSON format

      //   sendResponse(res, 200, 'application/json', data);

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      setInterval(() => {
        res.write(
          `data :${JSON.stringify({
            event: 'update-price',
            price: data,
          })}\n\n`
        );
      }, 2000);
    }
  } else if (!req.url.startsWith('/api')) {
    //serve static
    const __dirname = import.meta.dirname;
    const filePath = path.join(
      __dirname,
      'public',
      req.url === '/' ? 'index.html' : req.url
    );
    const ext = path.extname(filePath);
    const fileType = getFileType(ext);
    try {
      const content = await fs.readFile(filePath);
      sendResponse(res, 200, fileType, content);
    } catch (err) {
      if (err.code === 'ENOENT') {
        const content = await fs.readFile(
          path.join(__dirname, 'public', '404.html')
        );
        sendResponse(res, 404, 'text/html', content);
      } else {
        sendResponse(
          res,
          500,
          'text/html',
          '<html><h1>Server Error: ${err.code}</h1></html>'
        );
      }
    }
  }
});
server.listen(PORT, () => {
  console.log('Server connected to port: ', PORT);
});
