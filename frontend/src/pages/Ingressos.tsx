import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import type { Filme, Sala, Sessao, Ingresso } from '../types';
import { api } from '../services/api';
import { ingressoSchema, type IngressoFormData } from '../schemas';
import { formatarDataHora, formatarMoeda, VALOR_INTEIRA, VALOR_MEIA } from '../utils';
import { ZodError } from 'zod';

export function Ingressos() {
  const location = useLocation();
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<IngressoFormData>({
    sessaoId: '',
    tipo: 'inteira',
    quantidade: 1,
    valorTotal: 0,
  });

  const [valorUnitario, setValorUnitario] = useState(VALOR_INTEIRA);

  const carregarDados = useCallback(async () => {
    try {
      const [ingressosData, sessoesData, filmesData, salasData] = await Promise.all([
        api.ingressos.getAll(),
        api.sessoes.getAll(),
        api.filmes.getAll(),
        api.salas.getAll(),
      ]);
      setIngressos(ingressosData);
      setSessoes(sessoesData);
      setFilmes(filmesData);
      setSalas(salasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados');
    }
  }, []);

  const calcularValores = useCallback(() => {
    const valorUnit = formData.tipo === 'inteira' ? VALOR_INTEIRA : VALOR_MEIA;
    const total = valorUnit * formData.quantidade;
    setValorUnitario(valorUnit);
    setFormData(prev => ({ ...prev, valorTotal: total }));
  }, [formData.tipo, formData.quantidade]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  useEffect(() => {
    // Se vier de ListarSessoes com uma sessão pré-selecionada
    if (location.state?.sessaoId) {
      setFormData(prev => ({ ...prev, sessaoId: location.state.sessaoId }));
    }
  }, [location.state]);

  useEffect(() => {
    calcularValores();
  }, [calcularValores]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantidade' ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = ingressoSchema.parse(formData);
      await api.ingressos.create(validatedData);
      alert('Ingresso comprado com sucesso!');
      resetForm();
      await carregarDados();
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        alert('Erro ao comprar ingresso');
      }
    }
  }

  function resetForm() {
    setFormData({
      sessaoId: '',
      tipo: 'inteira',
      quantidade: 1,
      valorTotal: VALOR_INTEIRA,
    });
    setErrors({});
  }

  async function deletar(id: string) {
    if (!window.confirm('Tem certeza que deseja excluir este ingresso?')) return;

    try {
      await api.ingressos.delete(id);
      alert('Ingresso excluído com sucesso!');
      carregarDados();
    } catch {
      alert('Erro ao excluir ingresso');
    }
  }

  function getSessaoInfo(sessaoId: string) {
    const sessao = sessoes.find(s => s.id === sessaoId);
    if (!sessao) return { filme: 'N/A', sala: 'N/A', dataHora: 'N/A' };

    const filme = filmes.find(f => f.id === sessao.filmeId);
    const sala = salas.find(s => s.id === sessao.salaId);

    return {
      filme: filme ? filme.titulo : 'N/A',
      sala: sala ? sala.nome : 'N/A',
      dataHora: formatarDataHora(sessao.dataHora),
    };
  }

  return (
    <div className="container-fluid my-4 px-5">
      <h2 className="mb-5 text-center">Venda de Ingressos</h2>
      <div className="row g-4 align-items-start">
        {/* Formulário */}
        <div className="col-12 col-lg-6">
          <div className="bg-secondary bg-opacity-10 p-4 rounded shadow-sm h-100">
            <h4 className="mb-4">Comprar Ingresso</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label htmlFor="sessaoId" className="form-label">Sessão:</label>
                  <select
                    className={`form-select ${errors.sessaoId ? 'is-invalid' : ''}`}
                    id="sessaoId"
                    name="sessaoId"
                    value={formData.sessaoId}
                    onChange={handleChange}
                  >
                    <option value="">Selecione uma sessão</option>
                    {sessoes.map(sessao => {
                      const filme = filmes.find(f => f.id === sessao.filmeId);
                      const sala = salas.find(s => s.id === sessao.salaId);
                      return (
                        <option key={sessao.id} value={sessao.id}>
                          {filme?.titulo || 'N/A'} - {formatarDataHora(sessao.dataHora)} - {sala?.nome || 'N/A'}
                        </option>
                      );
                    })}
                  </select>
                  {errors.sessaoId && <div className="invalid-feedback">{errors.sessaoId}</div>}
                </div>

                <div className="col-12 col-sm-6 mb-3">
                  <label htmlFor="tipo" className="form-label">Tipo:</label>
                  <select
                    className="form-select"
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                  >
                    <option value="inteira">Inteira</option>
                    <option value="meia">Meia</option>
                  </select>
                </div>

                <div className="col-12 col-sm-6 mb-3">
                  <label htmlFor="quantidade" className="form-label">Quantidade:</label>
                  <input
                    type="number"
                    className={`form-control ${errors.quantidade ? 'is-invalid' : ''}`}
                    id="quantidade"
                    name="quantidade"
                    value={formData.quantidade}
                    onChange={handleChange}
                    min="1"
                  />
                  {errors.quantidade && <div className="invalid-feedback">{errors.quantidade}</div>}
                </div>

                <div className="col-12 mb-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <p className="mb-1"><strong>Valor Unitário:</strong></p>
                          <p className="mb-0">{formatarMoeda(valorUnitario)}</p>
                        </div>
                        <div className="col-6">
                          <p className="mb-1"><strong>Valor Total:</strong></p>
                          <p className="text-success fs-5 mb-0">{formatarMoeda(formData.valorTotal)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100">
                    Comprar Ingresso
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Listagem */}
        <div className="col-12 col-lg-6">
          <div className="bg-secondary bg-opacity-10 p-4 rounded shadow-sm">
            <h4 className="mb-4">Ingressos Comprados</h4>
            {ingressos.length === 0 ? (
              <p>Nenhum ingresso comprado.</p>
            ) : (
              <div>
                {ingressos.map(ingresso => {
                  const sessaoInfo = getSessaoInfo(ingresso.sessaoId);
                  const tipoTexto = ingresso.tipo === 'inteira' ? 'Inteira' : 'Meia';
                  const valorUnit = ingresso.tipo === 'inteira' ? VALOR_INTEIRA : VALOR_MEIA;

                  return (
                    <div className="card shadow-sm mb-3" key={ingresso.id}>
                      <div className="card-header bg-light">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="flex-grow-1">
                            <div><strong>{sessaoInfo.filme}</strong></div>
                            <div className="text-muted small">
                              {sessaoInfo.dataHora} - {sessaoInfo.sala}
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            <button className="btn btn-md btn-danger" onClick={() => deletar(ingresso.id)}>
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-4">
                            <p className="mb-2"><strong>Tipo:</strong></p>
                            <p className="mb-0">{tipoTexto}</p>
                          </div>
                          <div className="col-4">
                            <p className="mb-2"><strong>Quantidade:</strong></p>
                            <p className="mb-0">{ingresso.quantidade}x {formatarMoeda(valorUnit)}</p>
                          </div>
                          <div className="col-4">
                            <p className="mb-2"><strong>Total:</strong></p>
                            <p className="text-success fs-5 mb-0">{formatarMoeda(ingresso.valorTotal)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

