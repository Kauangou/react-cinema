import type { Filme, Sala, Sessao, Ingresso } from '../types';

// Decide API base: use env when provided; on Vercel use relative "/api"; locally default to json-server
const isBrowser = typeof window !== 'undefined';
const isVercelHost = isBrowser && /\.vercel\.app$/i.test(window.location.hostname);
const API_BASE = import.meta.env.VITE_API_BASE
  ? import.meta.env.VITE_API_BASE.replace(/\/$/, '')
  : (isVercelHost ? '' : 'http://localhost:3000');

function buildUrl(endpoint: string): string {
  // On Vercel, call serverless functions under /api
  if (isVercelHost || (API_BASE === '' && isBrowser)) {
    return `/api/${endpoint.replace(/^\//, '')}`;
  }
  // Otherwise, call json-server using API_BASE
  return `${API_BASE}/${endpoint.replace(/^\//, '')}`;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Generic CRUD operations
async function getAll<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(buildUrl(endpoint));
  return handleResponse<T[]>(response);
}

async function getById<T>(endpoint: string, id: string): Promise<T> {
  const response = await fetch(buildUrl(`${endpoint}/${id}`));
  return handleResponse<T>(response);
}

async function create<T>(endpoint: string, data: Omit<T, 'id'>): Promise<T> {
  const response = await fetch(buildUrl(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

async function update<T>(endpoint: string, id: string, data: Partial<T>): Promise<T> {
  const response = await fetch(buildUrl(`${endpoint}/${id}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

async function remove(endpoint: string, id: string): Promise<void> {
  const response = await fetch(buildUrl(`${endpoint}/${id}`), {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export const api = {
  filmes: {
    getAll: () => getAll<Filme>('filmes'),
    getById: (id: string) => getById<Filme>('filmes', id),
    create: (data: Omit<Filme, 'id'>) => create<Filme>('filmes', data),
    update: (id: string, data: Partial<Filme>) => update<Filme>('filmes', id, data),
    delete: (id: string) => remove('filmes', id),
  },
  salas: {
    getAll: () => getAll<Sala>('salas'),
    getById: (id: string) => getById<Sala>('salas', id),
    create: (data: Omit<Sala, 'id'>) => create<Sala>('salas', data),
    update: (id: string, data: Partial<Sala>) => update<Sala>('salas', id, data),
    delete: (id: string) => remove('salas', id),
  },
  sessoes: {
    getAll: () => getAll<Sessao>('sessoes'),
    getById: (id: string) => getById<Sessao>('sessoes', id),
    create: (data: Omit<Sessao, 'id'>) => create<Sessao>('sessoes', data),
    update: (id: string, data: Partial<Sessao>) => update<Sessao>('sessoes', id, data),
    delete: (id: string) => remove('sessoes', id),
  },
  ingressos: {
    getAll: () => getAll<Ingresso>('ingressos'),
    getById: (id: string) => getById<Ingresso>('ingressos', id),
    create: (data: Omit<Ingresso, 'id'>) => create<Ingresso>('ingressos', data),
    update: (id: string, data: Partial<Ingresso>) => update<Ingresso>('ingressos', id, data),
    delete: (id: string) => remove('ingressos', id),
  },
};
