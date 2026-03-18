//create server
import http from 'http';
import path from 'path';
import fs from 'fs/promises';
import getData from './utils/getData.js';
import getFileType from './utils/getFileType.js';
import sendResponse from './utils/sendResponse.js';

const PORT = 9000;
const server = http.createServer(async (req, res) => {
  console.log(req.url);
  if (req.url === '/api') {
    //serve data if GET method
    if (req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      setInterval(async () => {
        const data = await getData(); //JSON format
        console.log(data);
        //   sendResponse(res, 200, 'application/json', data);
        const time = new Date(data.updatedAt).toLocaleString('en-AU', {
          timeZone: 'Australia/Melbourne',
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          fractionalSecondDigits: 3,
        });
        res.write(
          `data: ${JSON.stringify({
            event: 'update-price',
            price: data.price.toFixed(2),
            time: time,
          })}\n\n`
        );
      }, 3000);
    } else if (req.method === 'POST') {
      //get the input amount from request
      let body = '';
      for await (let chunk of req) {
        body += chunk;
      }
      let bodyJSON = JSON.parse(body);
      //add transaction to gold-invest.json
      let transation = {
        'amount paid': bodyJSON.amount,
        'price per Oz': `USD ${bodyJSON.price}`,
        'gold sold': (bodyJSON.amount / bodyJSON.price).toFixed(4),
      };
      const filePath = path.join(
        import.meta.dirname,
        'data',
        'gold-invest.json'
      );
      const content = JSON.parse(await fs.readFile(filePath, 'utf8'));
      content.push({
        'transaction time': new Date().toISOString(),
        ...transation,
      });
      await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8');
      console.log('Transaction saved successfully');
      sendResponse(
        res,
        200,
        'application/json',
        JSON.stringify({ success: true })
      );
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
          `<html><h1>Server Error: ${err.code}</h1></html>`
        );
      }
    }
  }
});
server.listen(PORT, () => {
  console.log('Server connected to port: ', PORT);
});
