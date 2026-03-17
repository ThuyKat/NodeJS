import path from 'path';
import fs from 'fs/promises';
import sendResponse from './sendResponse.js';
import getContentType from './getContentType.js';
/**
 * Serves a static file from the frontend directory based on the request URL.
 * Responds with 404 if the file is not found.
 *
 * @param {import('http').IncomingMessage} req - The HTTP request object
 * @param {import('http').ServerResponse} res - The HTTP response object
 * @param {string} dir - The root directory path (process.cwd())
 * @returns {Promise<void>}
 */
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
