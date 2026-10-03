import { AlertCircle, LoaderCircle } from 'lucide-react';

export function LoadingState({ label = 'Loading...' }) { return <div className="state-panel"><LoaderCircle className="spin" /><span>{label}</span></div>; }
export function ErrorState({ message }) { return <div className="state-panel error-state"><AlertCircle /><span>{message}</span></div>; }

