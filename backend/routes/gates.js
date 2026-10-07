import { Router } from 'express';
import { getGatesCollection } from '../services/database.js';
import { generateTruthTable } from '../services/logic.js';

const router = Router();

router.get('/', async (req, res) => {
  const gates = await (await getGatesCollection())
    .find({}, { projection: { _id: 0, order: 0 } })
    .sort({ order: 1 })
    .toArray();
  res.json(gates);
});

router.get('/:id', async (req, res) => {
  const gate = await (await getGatesCollection()).findOne(
    { id: req.params.id.toLowerCase() },
    { projection: { _id: 0, order: 0 } }
  );
  if (!gate) return res.status(404).json({ error: 'Gate not found.' });
  return res.json({ ...gate, truthTable: generateTruthTable(gate.id) });
});

export default router;
