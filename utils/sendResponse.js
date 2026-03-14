export function sendResponse(res, header, status, payload) {
  res.setHeader('Content-Type', header);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'GET');
  res.statusCode = status;
  res.end(JSON.stringify(payload));
}
