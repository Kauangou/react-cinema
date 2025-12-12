import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="container-fluid my-5 px-5">
      <div className="text-center mb-5">
        <h1 className="display-4">CineWeb</h1>
        <p className="lead text-muted">
          Gerencie filmes, salas, sessões e vendas de ingressos em uma única plataforma!
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6 col-lg-6">
          <Link to="/filmes" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <i className="bi bi-film display-1 text-primary mb-3"></i>
                <h5 className="card-title">Filmes</h5>
                <p className="card-text text-muted">
                  Cadastre e gerencie filmes
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-6">
          <Link to="/salas" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <i className="bi bi-door-open display-1 text-success mb-3"></i>
                <h5 className="card-title">Salas</h5>
                <p className="card-text text-muted">
                  Cadastre e gerencie salas
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-6">
          <Link to="/sessoes" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <i className="bi bi-calendar-event display-1 text-warning mb-3"></i>
                <h5 className="card-title">Sessões</h5>
                <p className="card-text text-muted">
                  Cadastre e gerencie sessões
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-6">
          <Link to="/ingressos" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <i className="bi bi-ticket-perforated display-1 text-danger mb-3"></i>
                <h5 className="card-title">Ingressos</h5>
                <p className="card-text text-muted">
                  Venda de ingressos
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

