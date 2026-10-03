export const GATES = [
  { id: 'and', name: 'AND', type: 'two-input', expression: 'Y = A · B', description: 'Produces HIGH only when both inputs are HIGH.', application: 'Safety systems where two conditions must be true.' },
  { id: 'or', name: 'OR', type: 'two-input', expression: 'Y = A + B', description: 'Produces HIGH when at least one input is HIGH.', application: 'Alarm circuits with multiple trigger sources.' },
  { id: 'not', name: 'NOT', type: 'one-input', expression: 'Y = Ā', description: 'Inverts the input signal.', application: 'Active-low control signals and signal inversion.' },
  { id: 'nand', name: 'NAND', type: 'two-input', expression: 'Y = (A · B)̅', description: 'Produces LOW only when both inputs are HIGH.', application: 'Universal gate used to build any Boolean circuit.' },
  { id: 'nor', name: 'NOR', type: 'two-input', expression: 'Y = (A + B)̅', description: 'Produces HIGH only when both inputs are LOW.', application: 'Universal gate used in digital control circuits.' },
  { id: 'xor', name: 'XOR', type: 'two-input', expression: 'Y = A ⊕ B', description: 'Produces HIGH when the inputs are different.', application: 'Adders, parity checking, and binary comparison.' },
  { id: 'xnor', name: 'XNOR', type: 'two-input', expression: 'Y = (A ⊕ B)̅', description: 'Produces HIGH when the inputs are the same.', application: 'Equality comparators and matching circuits.' },
  { id: 'buffer', name: 'BUFFER', type: 'one-input', expression: 'Y = A', description: 'Passes the input through without changing it.', application: 'Signal strengthening and isolation between stages.' }
];

export function calculateGateOutput(gate, inputs) {
  const a = Boolean(inputs.a);
  const b = Boolean(inputs.b);
  switch (gate.toLowerCase()) {
    case 'and': return Number(a && b);
    case 'or': return Number(a || b);
    case 'not': return Number(!a);
    case 'nand': return Number(!(a && b));
    case 'nor': return Number(!(a || b));
    case 'xor': return Number(a !== b);
    case 'xnor': return Number(a === b);
    case 'buffer': return Number(a);
    default: throw new Error(`Unknown gate: ${gate}`);
  }
}

export function generateTruthTable(gate) {
  const record = GATES.find((item) => item.id === gate.toLowerCase());
  if (!record) throw new Error(`Unknown gate: ${gate}`);
  const rows = record.type === 'one-input'
    ? [{ a: 0 }, { a: 1 }]
    : [{ a: 0, b: 0 }, { a: 0, b: 1 }, { a: 1, b: 0 }, { a: 1, b: 1 }];
  return rows.map((inputs) => ({ ...inputs, y: calculateGateOutput(gate, inputs) }));
}

export function calculateHalfAdder({ a, b }) {
  return { sum: calculateGateOutput('xor', { a, b }), carry: calculateGateOutput('and', { a, b }) };
}

export function calculateFullAdder({ a, b, cin }) {
  const total = Number(Boolean(a)) + Number(Boolean(b)) + Number(Boolean(cin));
  const sum = total % 2;
  const cout = Number(total >= 2);
  return { sum, cout };
}

export function generateAdderTable(type) {
  const inputs = type === 'full'
    ? [0, 1].flatMap((a) => [0, 1].flatMap((b) => [0, 1].map((cin) => ({ a, b, cin }))))
    : [0, 1].flatMap((a) => [0, 1].map((b) => ({ a, b })));
  return inputs.map((row) => ({ ...row, ...(type === 'full' ? calculateFullAdder(row) : calculateHalfAdder(row)) }));
}
