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
    default: return 0;
  }
}

export function generateTruthTable(gate) {
  const oneInput = ['not', 'buffer'].includes(gate.toLowerCase());
  const combinations = oneInput ? [{ a: 0 }, { a: 1 }] : [{ a: 0, b: 0 }, { a: 0, b: 1 }, { a: 1, b: 0 }, { a: 1, b: 1 }];
  return combinations.map((inputs) => ({ ...inputs, y: calculateGateOutput(gate, inputs) }));
}

export function calculateHalfAdder({ a, b }) {
  return { sum: Number(Boolean(a) !== Boolean(b)), carry: Number(Boolean(a) && Boolean(b)) };
}

export function calculateFullAdder({ a, b, cin }) {
  const total = Number(Boolean(a)) + Number(Boolean(b)) + Number(Boolean(cin));
  return { sum: total % 2, cout: Number(total >= 2) };
}

export function generateAdderTable(type) {
  const rows = [];
  [0, 1].forEach((a) => [0, 1].forEach((b) => {
    if (type === 'full') [0, 1].forEach((cin) => rows.push({ a, b, cin, ...calculateFullAdder({ a, b, cin }) }));
    else rows.push({ a, b, ...calculateHalfAdder({ a, b }) });
  }));
  return rows;
}

export const expressions = [
  { id: 'and', label: 'A AND B', display: 'Y = A · B', vars: ['a', 'b'], evaluate: ({ a, b }) => Number(Boolean(a) && Boolean(b)) },
  { id: 'or', label: 'A OR B', display: 'Y = A + B', vars: ['a', 'b'], evaluate: ({ a, b }) => Number(Boolean(a) || Boolean(b)) },
  { id: 'not', label: 'NOT A', display: 'Y = Ā', vars: ['a'], evaluate: ({ a }) => Number(!a) },
  { id: 'and-or', label: '(A AND B) OR C', display: 'Y = (A · B) + C', vars: ['a', 'b', 'c'], evaluate: ({ a, b, c }) => Number((Boolean(a) && Boolean(b)) || Boolean(c)) },
  { id: 'or-not', label: '(A OR B) AND NOT C', display: 'Y = (A + B) · C̅', vars: ['a', 'b', 'c'], evaluate: ({ a, b, c }) => Number((Boolean(a) || Boolean(b)) && !Boolean(c)) }
];

export function generateExpressionTable(expression) {
  const combos = expression.vars.reduce((rows, variable) => rows.flatMap((row) => [{ ...row, [variable]: 0 }, { ...row, [variable]: 1 }]), [{}]);
  return combos.map((inputs) => ({ ...inputs, y: expression.evaluate(inputs) }));
}

