import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Info, RotateCcw } from 'lucide-react';
import { api } from '../services/api';
import { calculateGateOutput, generateTruthTable } from '../utils/logic';
import GateVisualizer from '../components/GateVisualizer';
import InputSwitch from '../components/InputSwitch';
import OutputIndicator from '../components/OutputIndicator';
import TruthTable from '../components/TruthTable';
import { ErrorState, LoadingState } from '../components/StatePanel';
import { PageIntro } from '../components/Layout';

export default function SimulatorPage() {
  const [gates, setGates] = useState([]);
  const [gateId, setGateId] = useState('and');
  const [inputs, setInputs] = useState({ a: 0, b: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { api.getGates().then(setGates).catch((err) => setError(err.message)).finally(() => setLoading(false)); }, []);
  const gate = gates.find((item) => item.id === gateId) || gates[0];
  const oneInput = gate?.type === 'one-input';
  const output = calculateGateOutput(gateId, inputs);
  const table = useMemo(() => generateTruthTable(gateId), [gateId]);
  const changeGate = (id) => { setGateId(id); setInputs({ a: 0, b: 0 }); };
  if (loading) return <LoadingState label="Loading the LogicLab gate library..." />;
  if (error) return <ErrorState message={error} />;
  return <><PageIntro eyebrow="INTERACTIVE WORKSPACE" title="Logic Gate Simulator">Select a gate, change the input signals, and observe digital logic in real time.</PageIntro>
    <div className="simulator-layout">
      <aside className="sim-card gate-picker"><div className="card-kicker">01 / SELECT GATE</div><label htmlFor="gate-select">Active component</label><div className="select-wrap"><select id="gate-select" value={gateId} onChange={(e) => changeGate(e.target.value)}>{gates.map((item) => <option key={item.id} value={item.id}>{item.name} Gate</option>)}</select><ChevronDown size={18} /></div><div className="gate-list">{gates.map((item) => <button key={item.id} className={item.id === gateId ? 'selected' : ''} onClick={() => changeGate(item.id)}><span>{item.name.slice(0, 2)}</span>{item.name}<i /></button>)}</div></aside>
      <main className="sim-card simulation-stage"><div className="stage-top"><div><div className="card-kicker">02 / SIMULATE</div><h2>{gate?.name} Gate</h2></div><button className="reset-button" onClick={() => setInputs({ a: 0, b: 0 })}><RotateCcw size={15} /> Reset</button></div><GateVisualizer gate={gateId} inputs={inputs} output={output} /><div className="input-control-group"><div className="control-title"><span>INPUT SIGNALS</span><small>Click a switch to toggle it</small></div><div className="switches"><InputSwitch label="INPUT A" value={inputs.a} onChange={(a) => setInputs({ ...inputs, a })} />{!oneInput && <InputSwitch label="INPUT B" value={inputs.b} onChange={(b) => setInputs({ ...inputs, b })} />}</div></div><OutputIndicator value={output} /></main>
      <aside className="right-panels"><section className="sim-card info-card"><div className="card-kicker">03 / GATE NOTES</div><div className="info-heading"><span><Info size={18} /></span><h2>{gate?.name} Gate</h2></div><p>{gate?.description}</p><div className="formula"><small>BOOLEAN EXPRESSION</small><strong>{gate?.expression}</strong></div><div className="application"><small>REAL-WORLD USE</small><p>{gate?.application}</p></div></section><section className="sim-card table-card"><div className="table-title"><div><div className="card-kicker">TRUTH TABLE</div><small>Highlighted = current state</small></div><span className="live-dot" /></div><TruthTable rows={table} inputs={oneInput ? ['a'] : ['a', 'b']} activeInputs={inputs} /></section></aside>
    </div>
  </>;
}
