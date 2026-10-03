export default function InputSwitch({ label, value, onChange, compact = false }) {
  return <button className={`input-switch ${value ? 'is-on' : ''} ${compact ? 'compact' : ''}`} onClick={() => onChange(value ? 0 : 1)} aria-pressed={Boolean(value)}>
    <span className="switch-label">{label}</span><span className="switch-track"><span className="switch-knob" /></span><span className="switch-value">{value ? '1' : '0'}</span>
  </button>;
}

