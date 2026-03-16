import fs from 'fs/promises';
import path from 'path';

/**
 * Reads and returns all data from the local JSON data file.
 *
 * @returns {Promise<any>} Parsed contents of data/data.json
 */
export async function handleGet() {
  try {
    const filePath = path.join('data', 'data.json');
    const content = JSON.parse(await fs.readFile(filePath, 'utf8'));
    return content;
  } catch (err) {
    console.log(err);
    return [];
  }
}
