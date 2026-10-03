import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { GATES } from './logic.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const databasePath = process.env.DATABASE_PATH || path.join(__dirname, '../data/logiclab.db');
const db = new Database(databasePath);
db.pragma('journal_mode = WAL');

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS gates (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL,
      boolean_expression TEXT NOT NULL, type TEXT NOT NULL, application TEXT NOT NULL
    );
  `);
  const gateCount = db.prepare('SELECT COUNT(*) AS count FROM gates').get().count;
  if (!gateCount) {
    const addGate = db.prepare('INSERT INTO gates (id, name, description, boolean_expression, type, application) VALUES (?, ?, ?, ?, ?, ?)');
    const insertGates = db.transaction(() => GATES.forEach((gate) => addGate.run(gate.id, gate.name, gate.description, gate.expression, gate.type, gate.application)));
    insertGates();
  }
}

export default db;
