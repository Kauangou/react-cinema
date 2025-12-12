import { z } from 'zod';

export const filmeSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  sinopse: z.string().min(10, 'A sinopse deve ter no mínimo 10 caracteres'),
  genero: z.string().min(1, 'Gênero é obrigatório'),
  classificacao: z.enum(['L', '10', '12', '14', '16', '18']),
  duracao: z.number().positive('A duração deve ser um número positivo (maior que 0)'),
  elenco: z.string(),
  dataInicio: z.string().min(1, 'Data de início é obrigatória'),
  dataFim: z.string().min(1, 'Data de fim é obrigatória'),
});

export const salaSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  capacidade: z.number().positive('A capacidade deve ser um número positivo'),
  tipo: z.enum(['2D', '3D', 'IMAX']),
});

export const sessaoSchema = z.object({
  filmeId: z.string().min(1, 'Filme é obrigatório'),
  salaId: z.string().min(1, 'Sala é obrigatória'),
  dataHora: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const now = new Date();
    return selectedDate >= now;
  }, 'A data da sessão não pode ser retroativa (anterior à data atual)'),
});

export const ingressoSchema = z.object({
  sessaoId: z.string().min(1, 'Sessão é obrigatória'),
  tipo: z.enum(['inteira', 'meia']),
  quantidade: z.number().positive('A quantidade deve ser um número positivo'),
  valorTotal: z.number().positive(),
});

export type FilmeFormData = z.infer<typeof filmeSchema>;
export type SalaFormData = z.infer<typeof salaSchema>;
export type SessaoFormData = z.infer<typeof sessaoSchema>;
export type IngressoFormData = z.infer<typeof ingressoSchema>;

