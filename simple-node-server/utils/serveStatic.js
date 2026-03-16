import path from 'path';
import fs from 'fs/promises';
import sendResponse from './sendResponse.js';
import getContentType from './getContentType.js';
export default async function serveStatic(req, res, dir) {
  //path to front end file
  const filePath = path.join(
    dir,
    'frontend',
    req.url === '/' ? 'index.html' : req.url
  );
  //fs module to read file, content type can change, adjust dynamically
  //get contentType
  const ext = path.extname(filePath);
  const contentType = getContentType(ext);
  try {
    const content = await fs.readFile(filePath);
    sendResponse(res, contentType, 200, content);
  } catch (err) {
    sendResponse(res, 'text/plain', 404, '404 Not Found');
  }
}
