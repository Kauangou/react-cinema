import { Link, NavLink } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-4 navbar-red-gradient">
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
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/filmes">
                <i className="bi bi-film me-1"></i>
                Filmes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/salas">
                <i className="bi bi-door-open me-1"></i>
                Salas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/sessoes">
                <i className="bi bi-calendar-event me-1"></i>
                Sessões
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/ingressos">
                <i className="bi bi-ticket-perforated me-1"></i>
                Ingressos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/listar-sessoes">
                <i className="bi bi-camera-reels me-1"></i>
                Listar Sessões
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
