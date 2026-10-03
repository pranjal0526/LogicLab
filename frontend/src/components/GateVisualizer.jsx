function Bubble({ x, y = 100 }) { return <circle cx={x} cy={y} r="9" className="gate-bubble" />; }

export default function GateVisualizer({ gate = 'and', inputs = { a: 0, b: 0 }, output = 0 }) {
  const oneInput = ['not', 'buffer'].includes(gate);
  const inverted = ['not', 'nand', 'nor', 'xnor'].includes(gate);
  const signal = output ? 'signal-high' : 'signal-low';
  const pathClass = (active) => active ? `${signal} signal-wire` : 'signal-wire';
  const labels = { and: 'AND', or: 'OR', not: 'NOT', nand: 'NAND', nor: 'NOR', xor: 'XOR', xnor: 'XNOR', buffer: 'BUF' };
  return <div className="gate-visualizer">
    <div className="visualizer-grid" />
    <svg viewBox="0 0 460 230" role="img" aria-label={`${labels[gate]} gate diagram`}>
      <path d="M25 70 H125" className={pathClass(inputs.a)} /><text x="10" y="75" className="wire-label">A</text>
      {!oneInput && <><path d="M25 155 H125" className={pathClass(inputs.b)} /><text x="10" y="160" className="wire-label">B</text></>}
      {oneInput && <path d="M125 70 V115" className={pathClass(inputs.a)} />}
      {['and', 'nand'].includes(gate) && <path d="M125 45 H205 A65 65 0 0 1 205 185 H125 Z" className="gate-shape" />}
      {['or', 'nor', 'xor', 'xnor'].includes(gate) && <>{['xor', 'xnor'].includes(gate) && <path d="M109 45 Q145 115 109 185" className="gate-shape no-fill" />}<path d="M125 45 Q160 115 125 185 Q225 185 270 115 Q225 45 125 45 Z" className="gate-shape" /></>}
      {['not', 'buffer'].includes(gate) && <path d="M125 62 L125 168 L270 115 Z" className="gate-shape" />}
      <text x={gate === 'not' || gate === 'buffer' ? 168 : 157} y="121" className="gate-name">{labels[gate]}</text>
      {inverted && <Bubble x={['not'].includes(gate) ? 279 : 279} y={115} />}
      <path d={`M${inverted ? 289 : 270} 115 H415`} className={`${signal} signal-wire`} /><text x="426" y="120" className="wire-label">Y</text>
      <circle cx="405" cy="115" r="5" className={output ? 'output-dot high-dot' : 'output-dot'} />
    </svg>
  </div>;
}

