import http from 'node:http';
import { handleGet } from '../utils/routeHandlers.js';
import sendResponse from '../utils/sendResponse.js';
import { getFilteredData } from '../utils/getFilteredData.js';
import serveStatic from '../utils/serveStatic.js';

let PORT = 9000;
const __dirname = process.cwd();
const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api')) {
    console.log('with api', req.url);
    if (req.method === 'GET') {
      let myData = await handleGet(); //call getData(), turn data into string
      //filter data
      let urlObj = new URL(req.url, `https://${req.headers.host}`);
      let queryObj = Object.fromEntries(urlObj.searchParams);
      let filteredData = getFilteredData(myData, queryObj);
      //send response data
      sendResponse(res, 'application/json', 200, filteredData);
    }
  }
  if (!req.url.startsWith('/api')) {
    console.log(req.url);
    return await serveStatic(req, res, __dirname);
  }
});
server.listen(PORT, () => {
  console.log('Server listening from port:', PORT);
});
console.log(import.meta); //give the path to this file's containing folder
console.log('CWD', process.cwd()); // the directory we are working
