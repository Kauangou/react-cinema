export function formatarData(dataString: string): string {
  if (!dataString) return 'N/A';
  const data = new Date(dataString + 'T00:00:00');
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export function formatarDataHora(dataHoraString: string): string {
  if (!dataHoraString) return 'N/A';
  const data = new Date(dataHoraString);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, '0');
  const minuto = String(data.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function getCorClassificacao(classificacao: string): string {
  const cores: Record<string, string> = {
    L: 'success',
    '10': 'primary',
    '12': 'warning',
    '14': 'orange',
    '16': 'danger',
    '18': 'dark',
  };
  return cores[classificacao] || 'secondary';
}

export function getClasseBadgeTipo(tipo: string): string {
  const classes: Record<string, string> = {
    '2D': 'bg-secondary',
    '3D': 'bg-primary',
    'IMAX': 'bg-dark text-warning',
  };
  return classes[tipo] || 'bg-secondary';
}

export const GENEROS_FILMES = [
  'Ação',
  'Aventura',
  'Comédia',
  'Drama',
  'Ficção Científica',
  'Romance',
  'Terror',
  'Suspense',
  'Animação',
  'Documentário',
];

export const VALOR_INTEIRA = 28.0;
export const VALOR_MEIA = 14.0;

