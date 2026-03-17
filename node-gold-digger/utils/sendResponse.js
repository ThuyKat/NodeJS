export default function sendResponse(res, status, contentType, payload) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', ['GET', 'POST']);
  res.setHeader('Content-Type', contentType);
  res.statusCode = status;
  res.end(payload);
}
