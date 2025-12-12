import {useState, useEffect, useCallback} from 'react';
import type {Filme} from '../types';
import {api} from '../services/api';
import {filmeSchema, type FilmeFormData} from '../schemas';
import {formatarData, getCorClassificacao, GENEROS_FILMES} from '../utils';
import {ZodError} from 'zod';

export function Filmes() {
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [editandoId, setEditandoId] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState<FilmeFormData>({
        titulo: '',
        sinopse: '',
        genero: GENEROS_FILMES[0],
        classificacao: 'L',
        duracao: 0,
        elenco: '',
        dataInicio: '',
        dataFim: '',
    });

    const carregarFilmes = useCallback(async () => {
        try {
            const data = await api.filmes.getAll();
            setFilmes(data);
        } catch (error) {
            console.error('Erro ao carregar filmes:', error);
            alert('Erro ao carregar filmes');
        }
    }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    carregarFilmes();
  }, [carregarFilmes]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'duracao' ? Number(value) : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({});

        try {
            const validatedData = filmeSchema.parse(formData);

            if (editandoId) {
                await api.filmes.update(editandoId, validatedData);
                alert('Filme atualizado com sucesso!');
                setEditandoId(null);
            } else {
                await api.filmes.create(validatedData);
                alert('Filme cadastrado com sucesso!');
            }

            resetForm();
            await carregarFilmes();
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
                alert('Erro ao salvar filme');
            }
        }
    }

    function resetForm() {
        setFormData({
            titulo: '',
            sinopse: '',
            genero: GENEROS_FILMES[0],
            classificacao: 'L',
            duracao: 0,
            elenco: '',
            dataInicio: '',
            dataFim: '',
        });
        setEditandoId(null);
        setErrors({});
    }

    function editar(filme: Filme) {
        setFormData({
            titulo: filme.titulo,
            sinopse: filme.sinopse,
            genero: filme.genero,
            classificacao: filme.classificacao,
            duracao: filme.duracao,
            elenco: filme.elenco,
            dataInicio: filme.dataInicio,
            dataFim: filme.dataFim,
        });
        setEditandoId(filme.id);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    async function deletar(id: string) {
        if (!window.confirm('Tem certeza que deseja excluir este filme?')) return;

        try {
            await api.filmes.delete(id);
            alert('Filme excluído com sucesso!');
            carregarFilmes();
        } catch {
            alert('Erro ao excluir filme');
        }
    }

    return (
        <div className="container-fluid my-4 px-5">
            <h2 className="mb-5 text-center">Filmes</h2>
            <div className="row g-4 align-items-start">
                {/* Formulário */}
                <div className="col-12 col-lg-6">
                    <div className="bg-secondary bg-opacity-10 p-4 rounded shadow-sm h-100">
                        <h4 className="mb-4">{editandoId ? 'Editar Filme' : 'Cadastrar Filme'}</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="titulo" className="form-label">Título:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                                        id="titulo"
                                        name="titulo"
                                        value={formData.titulo}
                                        onChange={handleChange}
                                        placeholder="Digite o título"
                                    />
                                    {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="sinopse" className="form-label">Sinopse:</label>
                                    <textarea
                                        className={`form-control ${errors.sinopse ? 'is-invalid' : ''}`}
                                        id="sinopse"
                                        name="sinopse"
                                        value={formData.sinopse}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="Digite a sinopse"
                                    />
                                    {errors.sinopse && <div className="invalid-feedback">{errors.sinopse}</div>}
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="elenco" className="form-label">Elenco:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="elenco"
                                        name="elenco"
                                        value={formData.elenco}
                                        onChange={handleChange}
                                        placeholder="Digite o elenco principal"
                                    />
                                </div>

                                <div className="col-12 col-sm-4 mb-3">
                                    <label htmlFor="genero" className="form-label">Gênero:</label>
                                    <select
                                        className="form-select"
                                        id="genero"
                                        name="genero"
                                        value={formData.genero}
                                        onChange={handleChange}
                                    >
                                        {GENEROS_FILMES.map(genero => (
                                            <option key={genero} value={genero}>{genero}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-12 col-sm-4 mb-3">
                                    <label htmlFor="classificacao" className="form-label">Classificação:</label>
                                    <select
                                        className="form-select"
                                        id="classificacao"
                                        name="classificacao"
                                        value={formData.classificacao}
                                        onChange={handleChange}
                                    >
                                        <option value="L">Livre</option>
                                        <option value="10">+10</option>
                                        <option value="12">+12</option>
                                        <option value="14">+14</option>
                                        <option value="16">+16</option>
                                        <option value="18">+18</option>
                                    </select>
                                </div>

                                <div className="col-12 col-sm-4 mb-3">
                                    <label htmlFor="duracao" className="form-label">Duração (min):</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.duracao ? 'is-invalid' : ''}`}
                                        id="duracao"
                                        name="duracao"
                                        value={formData.duracao || ''}
                                        onChange={handleChange}
                                    />
                                    {errors.duracao && <div className="invalid-feedback">{errors.duracao}</div>}
                                </div>

                                <div className="col-12 col-sm-6 mb-3">
                                    <label htmlFor="dataInicio" className="form-label">Data Início:</label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.dataInicio ? 'is-invalid' : ''}`}
                                        id="dataInicio"
                                        name="dataInicio"
                                        value={formData.dataInicio}
                                        onChange={handleChange}
                                    />
                                    {errors.dataInicio && <div className="invalid-feedback">{errors.dataInicio}</div>}
                                </div>

                                <div className="col-12 col-sm-6 mb-3">
                                    <label htmlFor="dataFim" className="form-label">Data Fim:</label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.dataFim ? 'is-invalid' : ''}`}
                                        id="dataFim"
                                        name="dataFim"
                                        value={formData.dataFim}
                                        onChange={handleChange}
                                    />
                                    {errors.dataFim && <div className="invalid-feedback">{errors.dataFim}</div>}
                                </div>

                                <div className="col-12">
                                    <button type="submit"
                                            className={`btn ${editandoId ? 'btn-warning' : 'btn-primary'} w-100`}>
                                        {editandoId ? 'Atualizar Filme' : 'Cadastrar Filme'}
                                    </button>
                                    {editandoId && (
                                        <button type="button" className="btn btn-secondary w-100 mt-2"
                                                onClick={resetForm}>
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
                        <h4 className="mb-4">Filmes Cadastrados</h4>
                        {filmes.length === 0 ? (
                            <p>Nenhum filme cadastrado.</p>
                        ) : (
                            <div className="accordion" id="accordionFilmes">
                                {filmes.map((filme, index) => (
                                    <div className="accordion-item" key={filme.id}>
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed fs-5"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${index}`}
                                            >
                                                <div className="d-flex align-items-start w-100">
                          <span className={`badge bg-${getCorClassificacao(filme.classificacao)} me-3`}>
                            {filme.classificacao}
                          </span>
                                                    <div className="flex-grow-1">
                                                        <div><strong>{filme.titulo}</strong></div>
                                                        <div className="text-muted small">{filme.genero}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${index}`}
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFilmes"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-3"><em>{filme.sinopse || 'Sem sinopse'}</em></p>
                                                <p className="mb-1"><strong>Elenco:</strong> {filme.elenco || 'N/A'}</p>
                                                <p className="mb-1"><strong>Duração:</strong> {filme.duracao} min</p>
                                                <p className="mb-3">
                                                    <strong>Período:</strong> {formatarData(filme.dataInicio)} a {formatarData(filme.dataFim)}
                                                </p>
                                                <div className="d-flex justify-content-end">
                                                    <button className="btn btn-md btn-primary me-2"
                                                            onClick={() => editar(filme)}>
                                                        Editar
                                                    </button>
                                                    <button className="btn btn-md btn-danger"
                                                            onClick={() => deletar(filme.id)}>
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

