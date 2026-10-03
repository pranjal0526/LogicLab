import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu } from 'lucide-react';
import GateVisualizer from '../components/GateVisualizer';

export default function HomePage() {
  return <>
    <section className="hero">
      <div className="hero-copy"><div className="hero-tag"><span />DIGITAL SYSTEMS & LOGIC DESIGN</div><h1>Understand digital logic <em>by experimenting.</em></h1><p>LogicLab is a hands-on workspace for learning, simulating, and visualising the fundamental gates behind every digital system.</p><div className="hero-actions"><Link className="btn primary" to="/simulator">Start Experimenting <ArrowRight size={17} /></Link><Link className="btn secondary" to="/simulator"><BookOpen size={17} /> Explore Logic Gates</Link></div><div className="hero-stats"><span><b>8</b> logic gates</span><span><b>5</b> Boolean expressions</span><span><b>2</b> adder circuits</span></div></div>
      <div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-window"><div className="window-bar"><span /><span /><span /><b>LIVE SIMULATION</b></div><GateVisualizer gate="xor" inputs={{ a: 1, b: 0 }} output={1} /><div className="mini-result"><span>INPUTS <b>A = 1 &nbsp; B = 0</b></span><strong>Y = 1</strong></div></div></div>
    </section>
    <section className="section intro-section"><div><span className="eyebrow">THE IDEA</span><h2>Digital logic is the language <br />of modern electronics.</h2></div><p>Every computer, phone, and embedded system uses tiny decisions represented by <strong>0</strong> and <strong>1</strong>. Logic gates are the simple electronic building blocks that make those decisions possible.</p></section>
    <section className="section gates-section"><div className="section-heading"><div><span className="eyebrow">THE TOOLKIT</span><h2>Eight essential logic gates.</h2></div><Link to="/simulator" className="text-link">Explore all gates <ArrowRight size={16} /></Link></div><div className="gate-pills">{['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR', 'BUFFER'].map((gate, index) => <div className="gate-pill" key={gate}><span>{String(index + 1).padStart(2, '0')}</span><b>{gate}</b></div>)}</div></section>
    <section className="cta-section"><div><Cpu size={28} /><h2>Ready to make logic click?</h2><p>Start with a gate, then progress through expressions and circuits.</p></div><Link className="btn light" to="/simulator">Launch LogicLab <ArrowRight size={17} /></Link></section>
  </>;
}
