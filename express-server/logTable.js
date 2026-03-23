import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function viewAllMessages() {
  const db = await open({
    filename: path.join('database.js'),
    driver: sqlite3.Database,
  });
  try {
    const data = await db.all('SELECT * FROM messages');
    const display = data.map(({ message }) => {
      message = message.substring(0, 70);
      return { message };
    });
    console.table(display);
  } catch (err) {
    console.error('Error fetching messages', err);
  } finally {
    await db.close();
  }
}
viewAllMessages();
