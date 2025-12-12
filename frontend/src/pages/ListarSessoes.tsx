import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Filme, Sala, Sessao } from '../types';
import { api } from '../services/api';
import { formatarDataHora, getCorClassificacao } from '../utils';

export function ListarSessoes() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const navigate = useNavigate();

  const carregarDados = useCallback(async () => {
    try {
      const [sessoesData, filmesData, salasData] = await Promise.all([
        api.sessoes.getAll(),
        api.filmes.getAll(),
        api.salas.getAll(),
      ]);
      setSessoes(sessoesData);
      setFilmes(filmesData);
      setSalas(salasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados');
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  function getFilme(filmeId: string): Filme | undefined {
    return filmes.find(f => f.id === filmeId);
  }

  function getSala(salaId: string): Sala | undefined {
    return salas.find(s => s.id === salaId);
  }

  function comprarIngresso(sessaoId: string) {
    navigate('/ingressos', { state: { sessaoId } });
  }

  // Agrupar sessões por filme
  const sessoesPorFilme = sessoes.reduce((acc, sessao) => {
    if (!acc[sessao.filmeId]) {
      acc[sessao.filmeId] = [];
    }
    acc[sessao.filmeId].push(sessao);
    return acc;
  }, {} as Record<string, Sessao[]>);

  return (
    <div className="container-fluid my-4 px-5">
      <h2 className="mb-5 text-center">Sessões Disponíveis</h2>

      {Object.keys(sessoesPorFilme).length === 0 ? (
        <div className="text-center">
          <p className="text-muted">Nenhuma sessão disponível no momento.</p>
        </div>
      ) : (
        <div className="row g-4">
          {Object.entries(sessoesPorFilme).map(([filmeId, sessoesDoFilme]) => {
            const filme = getFilme(filmeId);
            if (!filme) return null;

            return (
              <div key={filmeId} className="col-12">
                <div className="card shadow-sm">
                  <div className="card-header bg-secondary text-white">
                    <div className="d-flex align-items-center">
                      <span className={`badge bg-${getCorClassificacao(filme.classificacao)} me-3`}>
                        {filme.classificacao}
                      </span>
                      <div className="flex-grow-1">
                        <h5 className="mb-0">{filme.titulo}</h5>
                        <small>{filme.genero} • {filme.duracao} min</small>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-muted mb-3">
                      <em>{filme.sinopse}</em>
                    </p>
                    {filme.elenco && (
                      <p className="mb-3">
                        <strong>Elenco:</strong> {filme.elenco}
                      </p>
                    )}
                    <h6 className="mb-3">Sessões Disponíveis:</h6>
                    <div className="row g-3">
                      {sessoesDoFilme.map(sessao => {
                        const sala = getSala(sessao.salaId);
                        return (
                          <div key={sessao.id} className="col-md-6 col-lg-4">
                            <div className="card border">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <div>
                                    <h6 className="mb-1">
                                      <i className="bi bi-clock me-1"></i>
                                      {formatarDataHora(sessao.dataHora)}
                                    </h6>
                                    <p className="text-muted mb-0 small">
                                      <i className="bi bi-door-open me-1"></i>
                                      Sala {sala?.nome || 'N/A'} ({sala?.tipo})
                                    </p>
                                    <p className="text-muted mb-0 small">
                                      <i className="bi bi-people me-1"></i>
                                      {sala?.capacidade} lugares
                                    </p>
                                  </div>
                                </div>
                                <button
                                  className="btn btn-primary btn-sm w-100 mt-2"
                                  onClick={() => comprarIngresso(sessao.id)}
                                >
                                  <i className="bi bi-ticket-perforated me-1"></i>
                                  Comprar Ingresso
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

