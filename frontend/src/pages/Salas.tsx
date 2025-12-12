import { useState, useEffect, useCallback } from 'react';
import type { Sala } from '../types';
import { api } from '../services/api';
import { salaSchema, type SalaFormData } from '../schemas';
import { getClasseBadgeTipo } from '../utils';
import { ZodError } from 'zod';

export function Salas() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<SalaFormData>({
    nome: '',
    capacidade: 0,
    tipo: '2D',
  });

  const carregarSalas = useCallback(async () => {
    try {
      const data = await api.salas.getAll();
      setSalas(data);
    } catch (error) {
      console.error('Erro ao carregar salas:', error);
      alert('Erro ao carregar salas');
    }
  }, []);

  useEffect(() => {
    // Initial data load on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    carregarSalas();
  }, [carregarSalas]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacidade' ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = salaSchema.parse(formData);

      if (editandoId) {
        await api.salas.update(editandoId, validatedData);
        alert('Sala atualizada com sucesso!');
        setEditandoId(null);
      } else {
        await api.salas.create(validatedData);
        alert('Sala cadastrada com sucesso!');
      }

      resetForm();
      await carregarSalas();
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
        alert('Erro ao salvar sala');
      }
    }
  }

  function resetForm() {
    setFormData({
      nome: '',
      capacidade: 0,
      tipo: '2D',
    });
    setEditandoId(null);
    setErrors({});
  }

  function editar(sala: Sala) {
    setFormData({
      nome: sala.nome,
      capacidade: sala.capacidade,
      tipo: sala.tipo,
    });
    setEditandoId(sala.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deletar(id: string) {
    if (!window.confirm('Tem certeza que deseja excluir esta sala?')) return;

    try {
      await api.salas.delete(id);
      alert('Sala excluída com sucesso!');
      carregarSalas();
    } catch {
      alert('Erro ao excluir sala');
    }
  }

  return (
    <div className="container-fluid my-4 px-5">
      <h2 className="mb-5 text-center">Salas</h2>
      <div className="row g-4 align-items-start">
        {/* Formulário */}
        <div className="col-12 col-lg-6">
          <div className="bg-secondary bg-opacity-10 p-4 rounded shadow-sm h-100">
            <h4 className="mb-4">{editandoId ? 'Editar Sala' : 'Cadastrar Sala'}</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label htmlFor="nome" className="form-label">Nome da Sala:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite o nome da sala"
                  />
                  {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                </div>

                <div className="col-12 col-sm-6 mb-3">
                  <label htmlFor="capacidade" className="form-label">Capacidade:</label>
                  <input
                    type="number"
                    className={`form-control ${errors.capacidade ? 'is-invalid' : ''}`}
                    id="capacidade"
                    name="capacidade"
                    value={formData.capacidade || ''}
                    onChange={handleChange}
                    placeholder="Número de assentos"
                  />
                  {errors.capacidade && <div className="invalid-feedback">{errors.capacidade}</div>}
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
                    <option value="2D">2D</option>
                    <option value="3D">3D</option>
                    <option value="IMAX">IMAX</option>
                  </select>
                </div>

                <div className="col-12">
                  <button type="submit" className={`btn ${editandoId ? 'btn-warning' : 'btn-primary'} w-100`}>
                    {editandoId ? 'Atualizar Sala' : 'Cadastrar Sala'}
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
            <h4 className="mb-4">Salas Cadastradas</h4>
            {salas.length === 0 ? (
              <p>Nenhuma sala cadastrada.</p>
            ) : (
              <div>
                {salas.map(sala => (
                  <div className="card mb-3 shadow-sm" key={sala.id}>
                    <div className="card-header bg-light">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-start flex-grow-1">
                          <span className={`badge ${getClasseBadgeTipo(sala.tipo)} me-3 p-2 text-center align-self-center`} style={{width: '50px'}}>
                            {sala.tipo}
                          </span>
                          <div className="flex-grow-1">
                            <div><strong>{sala.nome}</strong></div>
                            <div className="text-muted small">Capacidade: {sala.capacidade} pessoas</div>
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <button className="btn btn-md btn-primary" onClick={() => editar(sala)}>
                            Editar
                          </button>
                          <button className="btn btn-md btn-danger" onClick={() => deletar(sala.id)}>
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

