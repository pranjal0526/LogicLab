import { Zap } from 'lucide-react';

export default function OutputIndicator({ value, label = 'OUTPUT' }) {
  return <div className={`output-indicator ${value ? 'high' : 'low'}`}><span className="output-label">{label}</span><div className="led-row"><span className="led"><Zap size={14} fill="currentColor" /></span><strong>{value ? 'HIGH' : 'LOW'}</strong><b>{value ? '1' : '0'}</b></div></div>;
}

