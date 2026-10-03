import { useMemo, useState } from 'react';
import { Calculator, Plus } from 'lucide-react';
import { PageIntro } from '../components/Layout';
import InputSwitch from '../components/InputSwitch';
import OutputIndicator from '../components/OutputIndicator';
import TruthTable from '../components/TruthTable';
import { calculateFullAdder, calculateHalfAdder, generateAdderTable } from '../utils/logic';

function Circuit({ type }) {
  const isFull = type === 'full'; const [inputs, setInputs] = useState({ a: 0, b: 0, cin: 0 });
  const result = isFull ? calculateFullAdder(inputs) : calculateHalfAdder(inputs); const rows = useMemo(() => generateAdderTable(type), [type]);
  return <section className="circuit-card"><div className="circuit-heading"><span className="circuit-icon"><Calculator size={21} /></span><div><h2>{isFull ? 'Full Adder' : 'Half Adder'}</h2><p>{isFull ? 'Adds three one-bit values including carry-in.' : 'Adds two one-bit binary numbers.'}</p></div></div><div className="equation-strip"><span>SUM = {isFull ? 'A ⊕ B ⊕ Cin' : 'A ⊕ B'}</span><span>CARRY = {isFull ? 'AB + BCin + ACin' : 'A · B'}</span></div><div className="circuit-workspace"><div className="circuit-inputs"><small>INPUTS</small><InputSwitch label="A" compact value={inputs.a} onChange={(a) => setInputs({ ...inputs, a })} /><InputSwitch label="B" compact value={inputs.b} onChange={(b) => setInputs({ ...inputs, b })} />{isFull && <InputSwitch label="CIN" compact value={inputs.cin} onChange={(cin) => setInputs({ ...inputs, cin })} />}</div><div className="circuit-diagram"><div className="adder-box"><span>{isFull ? 'FULL' : 'HALF'}</span><b>ADDER</b><i>⊕</i></div><Plus size={20} /><div className="carry-line" /></div><div className="circuit-outputs"><OutputIndicator value={result.sum} label="SUM" /><OutputIndicator value={result[isFull ? 'cout' : 'carry']} label={isFull ? 'COUT' : 'CARRY'} /></div></div><div className="circuit-table"><div className="card-kicker">TRUTH TABLE</div><TruthTable rows={rows} inputs={isFull ? ['a', 'b', 'cin'] : ['a', 'b']} activeInputs={inputs} outputs={isFull ? [{ key: 'sum', label: 'SUM' }, { key: 'cout', label: 'COUT' }] : [{ key: 'sum', label: 'SUM' }, { key: 'carry', label: 'CARRY' }]} /></div></section>;
}

export default function CircuitsPage() { return <><PageIntro eyebrow="COMBINATIONAL CIRCUITS" title="From gates to useful circuits.">Adders combine individual logic gates to perform binary addition — a key operation inside processors.</PageIntro><div className="circuits-grid"><Circuit type="half" /><Circuit type="full" /></div></>;
}

