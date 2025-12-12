export interface Filme {
  id: string;
  titulo: string;
  sinopse: string;
  genero: string;
  classificacao: 'L' | '10' | '12' | '14' | '16' | '18';
  duracao: number;
  elenco: string;
  dataInicio: string;
  dataFim: string;
}

export interface Sala {
  id: string;
  nome: string;
  capacidade: number;
  tipo: '2D' | '3D' | 'IMAX';
}

export interface Sessao {
  id: string;
  filmeId: string;
  salaId: string;
  dataHora: string;
}

export interface Ingresso {
  id: string;
  sessaoId: string;
  tipo: 'inteira' | 'meia';
  quantidade: number;
  valorTotal: number;
}

