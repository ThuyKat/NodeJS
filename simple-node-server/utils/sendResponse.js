export default function sendResponse(res, header, status, payload) {
  res.setHeader('Content-Type', header);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'GET');
  res.statusCode = status;
  res.end(
    typeof payload === 'string' || Buffer.isBuffer(payload)
      ? payload
      : JSON.stringify(payload)
  );
}

/*
Buffers (static files like HTML/JS) → sent as-is
Strings (like '404 Not Found') → sent as-is
Objects/arrays (API JSON data) → JSON.stringify'd
here I am sending JSON data, but I already convert it into string and embed it into HTML file, and that's why I need to return un-stringified version
*/
