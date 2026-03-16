import fs from 'fs/promises';
import path from 'path';
import { getData } from './getData';

/**
 * Reads and returns all data from the local JSON data file.
 *
 * @returns {Promise<any>} Parsed contents of data/data.json
 */
export async function handleGet() {
  return JSON.stringify(await getData());
}
