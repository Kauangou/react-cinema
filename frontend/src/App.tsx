import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Filmes } from './pages/Filmes';
import { Salas } from './pages/Salas';
import { Sessoes } from './pages/Sessoes';
import { Ingressos } from './pages/Ingressos';
import { ListarSessoes } from './pages/ListarSessoes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<Filmes />} />
          <Route path="/salas" element={<Salas />} />
          <Route path="/sessoes" element={<Sessoes />} />
          <Route path="/ingressos" element={<Ingressos />} />
          <Route path="/listar-sessoes" element={<ListarSessoes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
