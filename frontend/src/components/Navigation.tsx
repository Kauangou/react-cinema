import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Cinema
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/filmes">
                <i className="bi bi-film me-1"></i>
                Filmes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/salas">
                <i className="bi bi-door-open me-1"></i>
                Salas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sessoes">
                <i className="bi bi-calendar-event me-1"></i>
                Sessões
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ingressos">
                <i className="bi bi-ticket-perforated me-1"></i>
                Ingressos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listar-sessoes">
                <i className="bi bi-camera-reels me-1"></i>
                Listar Sessões
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

