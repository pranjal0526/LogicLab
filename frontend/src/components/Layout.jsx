import { NavLink, Link } from 'react-router-dom';
import { Binary, Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  ['/', 'Home'], ['/simulator', 'Simulator'], ['/lab', 'Boolean Lab'], ['/circuits', 'Circuits']
];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="nav-shell">
      <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark"><Binary size={20} /></span><span>Logic<span>Lab</span></span></Link>
      <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
      </nav>
    </div>
  </header>;
}

export function PageIntro({ eyebrow, title, children }) {
  return <section className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{children && <p>{children}</p>}</section>;
}
