import 'dotenv/config';
/**
 *
 * @returns {Promise<object>} The full gold price data object from the API
 */
export default async function getData() {
  const URL = process.env.GOLD_API_URL;
  const response = await fetch(URL);
  const data = await response.json();
  return data; // string representation
}
