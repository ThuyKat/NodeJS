import 'dotenv/config';
/**
 *
 * @returns {Promise<string>} The current gold price rounded to 2 decimal places
 */
export default async function getData() {
  const URL = process.env.GOLD_API_URL;
  const response = await fetch(URL);
  const data = await response.json();
  return data.price.toFixed(2); // string representation
}
