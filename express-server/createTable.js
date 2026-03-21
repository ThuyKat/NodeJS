import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
async function createTable() {
  const db = await open({
    filename: path.join('database.js'),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message STRING NOT NULL,
    author STRING NOT NULL
    )
    `);
  await db.close();
  console.log('table messages is created');
}
createTable();
