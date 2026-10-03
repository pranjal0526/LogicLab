export default function TruthTable({ rows, inputs = ['a', 'b'], activeInputs, outputs = [{ key: 'y', label: 'Y' }] }) {
  const active = (row) => inputs.every((key) => Number(row[key]) === Number(activeInputs[key]));
  return <div className="table-wrap"><table className="truth-table"><thead><tr>{inputs.map((key) => <th key={key}>{key.toUpperCase()}</th>)}{outputs.map((item) => <th key={item.key}>{item.label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index} className={active(row) ? 'active-row' : ''}>{inputs.map((key) => <td key={key}>{row[key]}</td>)}{outputs.map((item) => <td key={item.key} className="output-cell">{row[item.key]}</td>)}</tr>)}</tbody></table></div>;
}

