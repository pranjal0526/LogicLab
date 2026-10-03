import { Link } from 'react-router-dom';
export default function NotFoundPage() { return <section className="not-found"><span className="eyebrow">404 / SIGNAL LOST</span><h1>That circuit does not exist.</h1><p>Return to LogicLab and choose a working route.</p><Link className="btn primary" to="/">Go home</Link></section>; }

