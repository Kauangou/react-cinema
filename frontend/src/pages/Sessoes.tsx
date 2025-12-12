import { useState, useEffect, useCallback } from 'react';
import type { Filme, Sala, Sessao } from '../types';
import { api } from '../services/api';
import { sessaoSchema, type SessaoFormData } from '../schemas';
import { formatarDataHora } from '../utils';
import { ZodError } from 'zod';

export function Sessoes() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<SessaoFormData>({
    filmeId: '',
    salaId: '',
    dataHora: '',
  });

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = sessaoSchema.parse(formData);

      if (editandoId) {
        await api.sessoes.update(editandoId, validatedData);
        alert('Sessão atualizada com sucesso!');
        setEditandoId(null);
      } else {
        await api.sessoes.create(validatedData);
        alert('Sessão cadastrada com sucesso!');
      }

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
        alert('Erro ao salvar sessão');
      }
    }
  }

  function resetForm() {
    setFormData({
      filmeId: '',
      salaId: '',
      dataHora: '',
    });
    setEditandoId(null);
    setErrors({});
  }

  function editar(sessao: Sessao) {
    setFormData({
      filmeId: sessao.filmeId,
      salaId: sessao.salaId,
      dataHora: sessao.dataHora,
    });
    setEditandoId(sessao.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deletar(id: string) {
    if (!window.confirm('Tem certeza que deseja excluir esta sessão?')) return;

    try {
      await api.sessoes.delete(id);
      alert('Sessão excluída com sucesso!');
      carregarDados();
    } catch {
      alert('Erro ao excluir sessão');
    }
  }

  function getFilmeNome(filmeId: string): string {
    const filme = filmes.find(f => f.id === filmeId);
    return filme ? filme.titulo : 'Filme não encontrado';
  }

  function getSalaNome(salaId: string): string {
    const sala = salas.find(s => s.id === salaId);
    return sala ? sala.nome : 'Sala não encontrada';
  }

  return (
    <div className="container-fluid my-4 px-5">
      <h2 className="mb-5 text-center">Sessões</h2>
      <div className="row g-4 align-items-start">
        {/* Formulário */}
        <div className="col-12 col-lg-6">
          <div className="bg-secondary bg-opacity-10 p-4 rounded shadow-sm h-100">
            <h4 className="mb-4">{editandoId ? 'Editar Sessão' : 'Cadastrar Sessão'}</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label htmlFor="filmeId" className="form-label">Filme:</label>
                  <select
                    className={`form-select ${errors.filmeId ? 'is-invalid' : ''}`}
                    id="filmeId"
                    name="filmeId"
                    value={formData.filmeId}
                    onChange={handleChange}
                  >
                    <option value="">Selecione um filme</option>
                    {filmes.map(filme => (
                      <option key={filme.id} value={filme.id}>{filme.titulo}</option>
                    ))}
                  </select>
                  {errors.filmeId && <div className="invalid-feedback">{errors.filmeId}</div>}
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="salaId" className="form-label">Sala:</label>
                  <select
                    className={`form-select ${errors.salaId ? 'is-invalid' : ''}`}
                    id="salaId"
                    name="salaId"
                    value={formData.salaId}
                    onChange={handleChange}
                  >
                    <option value="">Selecione uma sala</option>
                    {salas.map(sala => (
                      <option key={sala.id} value={sala.id}>
                        {sala.nome} ({sala.capacidade} lugares)
                      </option>
                    ))}
                  </select>
                  {errors.salaId && <div className="invalid-feedback">{errors.salaId}</div>}
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="dataHora" className="form-label">Data e Hora:</label>
                  <input
                    type="datetime-local"
                    className={`form-control ${errors.dataHora ? 'is-invalid' : ''}`}
                    id="dataHora"
                    name="dataHora"
                    value={formData.dataHora}
                    onChange={handleChange}
                  />
                  {errors.dataHora && <div className="invalid-feedback">{errors.dataHora}</div>}
                </div>

                <div className="col-12">
                  <button type="submit" className={`btn ${editandoId ? 'btn-warning' : 'btn-primary'} w-100`}>
                    {editandoId ? 'Atualizar Sessão' : 'Cadastrar Sessão'}
                  </button>
                  {editandoId && (
                    <button type="button" className="btn btn-secondary w-100 mt-2" onClick={resetForm}>
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Listagem */}
        <div className="col-12 col-lg-6">
          <div className="bg-secondary bg-opacity-10 p-4 rounded shadow-sm">
            <h4 className="mb-4">Sessões Cadastradas</h4>
            {sessoes.length === 0 ? (
              <p>Nenhuma sessão cadastrada.</p>
            ) : (
              <div>
                {sessoes.map(sessao => (
                  <div className="card mb-3 shadow-sm" key={sessao.id}>
                    <div className="card-header bg-light">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="flex-grow-1">
                          <div><strong>{getFilmeNome(sessao.filmeId)}</strong></div>
                          <div className="text-muted small">
                            {formatarDataHora(sessao.dataHora)} - {getSalaNome(sessao.salaId)}
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <button className="btn btn-md btn-primary" onClick={() => editar(sessao)}>
                            Editar
                          </button>
                          <button className="btn btn-md btn-danger" onClick={() => deletar(sessao.id)}>
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

