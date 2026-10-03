import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Layout';
import HomePage from './pages/HomePage';
import SimulatorPage from './pages/SimulatorPage';
import ExpressionLabPage from './pages/ExpressionLabPage';
import CircuitsPage from './pages/CircuitsPage';
import NotFoundPage from './pages/NotFoundPage';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function App() { return <BrowserRouter><ScrollTop /><Header /><main className="main-content"><Routes><Route path="/" element={<HomePage />} /><Route path="/simulator" element={<SimulatorPage />} /><Route path="/lab" element={<ExpressionLabPage />} /><Route path="/circuits" element={<CircuitsPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></main></BrowserRouter>; }
export default App;
