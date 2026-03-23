import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { my_messages } from './data.js';
async function seedTable() {
  const db = await open({
    filename: path.join('database.js'),
    driver: sqlite3.Database,
  });

  try {
    await db.exec('BEGIN TRANSACTION');
    for (let message of my_messages) {
      await db.run(
        `
            INSERT INTO messages (message,author)
            VALUES (?,?)
            `,
        [message.message, message.author]
      );
    }
    await db.exec('COMMIT');
    console.log('upated db table with seeding data');
  } catch (err) {
    await db.exec('ROLL BACK');
    console.log('Error happened, cannot seed table');
  } finally {
    await db.close();
  }
}
seedTable();
