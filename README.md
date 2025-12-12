# Sistema CineWeb - Sistema de Gerenciamento de Cinema (React + TypeScript)

Este projeto é um sistema completo de gerenciamento de cinema desenvolvido com **React**, **TypeScript**, **Vite**, **Bootstrap** e **json-server**.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento SPA
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Biblioteca de ícones
- **Zod** - Validação de schemas e formulários
- **json-server** - API REST simulada

## 📋 Funcionalidades

### 1. Cadastro de Filmes
- Cadastrar filmes com título, sinopse, gênero, classificação, duração, elenco e período de exibição
- Editar e excluir filmes
- Validação com Zod:
  - Título obrigatório
  - Duração deve ser número positivo
  - Sinopse com mínimo de 10 caracteres

### 2. Cadastro de Salas
- Cadastrar salas com nome, capacidade e tipo (2D, 3D, IMAX)
- Editar e excluir salas
- Validação com Zod

### 3. Cadastro de Sessões
- Cadastrar sessões vinculando filme e sala
- Definir data e hora da sessão
- Editar e excluir sessões
- Validação com Zod:
  - Filme e sala obrigatórios
  - Data da sessão não pode ser retroativa

### 4. Venda de Ingressos
- Selecionar sessão, tipo (inteira/meia) e quantidade
- Cálculo automático de valores
- Valores: Inteira R$ 28,00 | Meia R$ 14,00

### 5. Listagem de Sessões
- Visualização pública de sessões disponíveis
- Agrupadas por filme
- Botão para comprar ingressos

## 🗂️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   └── Navigation.tsx          # Barra de navegação
│   ├── pages/
│   │   ├── Home.tsx                # Página inicial
│   │   ├── Filmes.tsx              # CRUD de filmes
│   │   ├── Salas.tsx               # CRUD de salas
│   │   ├── Sessoes.tsx             # CRUD de sessões
│   │   ├── Ingressos.tsx           # Venda de ingressos
│   │   └── ListarSessoes.tsx       # Listagem pública
│   ├── schemas/
│   │   └── index.ts                # Schemas Zod para validação
│   ├── services/
│   │   └── api.ts                  # Serviço de API
│   ├── types/
│   │   └── index.ts                # Tipos TypeScript
│   ├── utils/
│   │   └── index.ts                # Funções utilitárias
│   ├── App.tsx                     # Componente principal
│   └── main.tsx                    # Entry point
├── db.json                         # Banco de dados JSON
└── package.json
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 20.12 ou superior)
- npm ou yarn

### Passo 1: Instalar Dependências
```bash
cd frontend
npm install
```

### Passo 2: Iniciar o JSON Server (Terminal 1)
```bash
npm run server
```
O servidor estará disponível em `http://localhost:3000`

### Passo 3: Iniciar o Vite Dev Server (Terminal 2)
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

## 📊 Estrutura do db.json

```json
{
  "filmes": [
    {
      "id": "uuid",
      "titulo": "string",
      "sinopse": "string",
      "genero": "string",
      "classificacao": "L|10|12|14|16|18",
      "duracao": "number",
      "elenco": "string",
      "dataInicio": "YYYY-MM-DD",
      "dataFim": "YYYY-MM-DD"
    }
  ],
  "salas": [
    {
      "id": "uuid",
      "nome": "string",
      "capacidade": "number",
      "tipo": "2D|3D|IMAX"
    }
  ],
  "sessoes": [
    {
      "id": "uuid",
      "filmeId": "uuid",
      "salaId": "uuid",
      "dataHora": "YYYY-MM-DDTHH:mm"
    }
  ],
  "ingressos": [
    {
      "id": "uuid",
      "sessaoId": "uuid",
      "tipo": "inteira|meia",
      "quantidade": "number",
      "valorTotal": "number"
    }
  ]
}
```

## 🎯 Regras de Negócio

### Validação de Filmes
- ✅ Título é obrigatório
- ✅ Duração deve ser maior que 0
- ✅ Sinopse deve ter no mínimo 10 caracteres

### Validação de Sessões
- ✅ Não permite criar sessão sem filme e sala
- ✅ Data da sessão não pode ser anterior à data atual

### Validação de Salas
- ✅ Nome é obrigatório
- ✅ Capacidade deve ser número positivo

## 🛣️ Rotas da Aplicação

- `/` - Página inicial com cards de acesso rápido
- `/filmes` - Gerenciamento de filmes
- `/salas` - Gerenciamento de salas
- `/sessoes` - Gerenciamento de sessões
- `/ingressos` - Venda de ingressos
- `/listar-sessoes` - Listagem pública de sessões

## 🎨 Recursos de UI/UX

- Design responsivo com Bootstrap 5
- Ícones do Bootstrap Icons
- Formulários com validação em tempo real
- Feedback visual de erros
- Cards e accordions para melhor organização
- Navegação SPA sem reload de página

## 🧪 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento Vite
npm run build    # Build de produção
npm run preview  # Preview do build de produção
npm run server   # Inicia o json-server na porta 3000
npm run lint     # Executa o ESLint
```

