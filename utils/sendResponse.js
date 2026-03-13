export function sendResponse(res, header, status, payload) {
  res.setHeader('Content-Type', header);
  res.statusCode = status;
  res.end(JSON.stringify(payload));
}
