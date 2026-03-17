/**
 * Returns the MIME content type for a given file extension.
 *
 * @param {string} type - The file extension including the dot (e.g. '.js', '.png')
 * @returns {string} The corresponding MIME type, or 'text/html' if unrecognised
 */
export default function getContentType(type) {
  const types = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };
  return types[type.toLowerCase()] || 'text/html';
}
