import { Router } from 'express';
import db from '../services/database.js';
import { generateTruthTable } from '../services/logic.js';

const router = Router();

router.get('/', (req, res) => {
  const gates = db.prepare('SELECT id, name, description, boolean_expression AS expression, type, application FROM gates ORDER BY rowid').all();
  res.json(gates);
});

router.get('/:id', (req, res) => {
  const gate = db.prepare('SELECT id, name, description, boolean_expression AS expression, type, application FROM gates WHERE id = ?').get(req.params.id.toLowerCase());
  if (!gate) return res.status(404).json({ error: 'Gate not found.' });
  return res.json({ ...gate, truthTable: generateTruthTable(gate.id) });
});

export default router;

