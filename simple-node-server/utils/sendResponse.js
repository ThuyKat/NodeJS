/**
 * Sends an HTTP response with the given content type, status code, and payload.
 *
 * @param {import('http').ServerResponse} res - The HTTP response object
 * @param {string} header - The Content-Type header value (e.g. 'application/json', 'text/html')
 * @param {number} status - The HTTP status code (e.g. 200, 404)
 * @param {string|Buffer} payload - The response body to send
 * @returns {void}
 */
export default function sendResponse(res, header, status, payload) {
  res.setHeader('Content-Type', header);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'GET');
  res.statusCode = status;
  res.end(
    payload
    // typeof payload === 'string' || Buffer.isBuffer(payload)
    //   ? payload
    //   : JSON.stringify(payload)
  );
}

/*
Buffers (static files like HTML/JS) → sent as-is
Strings (like '404 Not Found') → sent as-is
Objects/arrays (API JSON data) → JSON.stringify'd - this has been done in handleGet in routeHandlers as this function call getData (JSON) and return data string
*/
