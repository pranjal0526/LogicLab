import { useMemo, useState } from 'react';
import { FunctionSquare } from 'lucide-react';
import { PageIntro } from '../components/Layout';
import InputSwitch from '../components/InputSwitch';
import OutputIndicator from '../components/OutputIndicator';
import TruthTable from '../components/TruthTable';
import { expressions, generateExpressionTable } from '../utils/logic';

export default function ExpressionLabPage() {
  const [expressionId, setExpressionId] = useState('and-or');
  const [inputs, setInputs] = useState({ a: 0, b: 0, c: 0 });
  const expression = expressions.find((item) => item.id === expressionId);
  const output = expression.evaluate(inputs);
  const table = useMemo(() => generateExpressionTable(expression), [expression]);
  return <><PageIntro eyebrow="BOOLEAN EXPRESSION LAB" title="Go beyond a single gate.">Try a small set of common Boolean expressions without needing to write a parser or compiler.</PageIntro><div className="expression-layout"><section className="lab-card expression-menu"><div className="card-kicker">CHOOSE AN EXPRESSION</div>{expressions.map((item) => <button className={item.id === expressionId ? 'active' : ''} key={item.id} onClick={() => setExpressionId(item.id)}><FunctionSquare size={17} /><span>{item.label}</span></button>)}</section><main className="lab-card expression-stage"><div className="card-kicker">LIVE EVALUATION</div><div className="expression-display"><span>SELECTED LOGIC</span><h2>{expression.display}</h2></div><div className="input-control-group"><div className="control-title"><span>VARIABLE VALUES</span><small>Toggle each binary input</small></div><div className="switches expression-switches">{expression.vars.map((variable) => <InputSwitch key={variable} label={`INPUT ${variable.toUpperCase()}`} value={inputs[variable]} onChange={(value) => setInputs({ ...inputs, [variable]: value })} />)}</div></div><OutputIndicator value={output} label="EXPRESSION OUTPUT" /><div className="expression-note">This lab uses predefined expressions so you can focus on Boolean operations and truth tables.</div></main><section className="lab-card expression-table"><div className="table-title"><div><div className="card-kicker">TRUTH TABLE</div><small>Current state is highlighted</small></div><span className="live-dot" /></div><TruthTable rows={table} inputs={expression.vars} activeInputs={inputs} /></section></div></>;
}

