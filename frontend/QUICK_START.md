# 🚀 Sistema CineWeb - Guia Prático

## ⚡ Começando em 3 Passos

### 1️⃣ Abrir Dois Terminais

Você precisará de dois terminais abertos na pasta `frontend`:

```bash
cd "D:\Kauan\Faculdade\6 periodo\Tecnologia de Construcao de Software I\Software\react-cinema\frontend"
```

### 2️⃣ Terminal 1: Iniciar o Backend (json-server)

```bash
npm run server
```

### 3️⃣ Terminal 2: Iniciar o Frontend (React)

```bash
npm run dev
```

**Abra seu navegador em: http://localhost:5173**

---

## 📱 Como Usar o Sistema

### 1. Cadastrar um Filme
1. Acesse **Filmes** no menu
2. Preencha o formulário:
   - Título (obrigatório)
   - Sinopse (mínimo 10 caracteres)
   - Duração (número positivo)
   - Demais campos
3. Clique em **Cadastrar Filme**

### 2. Cadastrar uma Sala
1. Acesse **Salas** no menu
2. Preencha:
   - Nome da sala
   - Capacidade (número positivo)
   - Tipo (2D/3D/IMAX)
3. Clique em **Cadastrar Sala**

### 3. Criar uma Sessão
1. Acesse **Sessões** no menu
2. Selecione um **Filme** (precisa ter cadastrado antes)
3. Selecione uma **Sala** (precisa ter cadastrado antes)
4. Escolha uma **Data/Hora** (não pode ser retroativa)
5. Clique em **Cadastrar Sessão**

### 4. Vender Ingressos
**Opção 1 - Pela página de Ingressos:**
1. Acesse **Ingressos** no menu
2. Selecione uma sessão
3. Escolha o tipo (Inteira R$ 30 ou Meia R$ 15)
4. Defina a quantidade
5. Clique em **Comprar Ingresso**

**Opção 2 - Pela Listagem de Sessões:**
1. Acesse **Listar Sessões** no menu
2. Encontre a sessão desejada
3. Clique em **Comprar Ingresso**
4. Complete o formulário

---

## ⚠️ Problemas Comuns

### Erro: "EADDRINUSE: address already in use :::3000"
**Solução**: A porta 3000 já está em uso.
```bash
# Windows - Encontre e mate o processo
netstat -ano | findstr :3000
taskkill /PID [número_do_processo] /F
```

### Erro: "Cannot GET /api/filmes"
**Solução**: O json-server não está rodando.
- Certifique-se de que o Terminal 1 está com `npm run server` ativo

### Página em branco
**Solução**: 
1. Abra o Console do navegador (F12)
2. Verifique se há erros
3. Confirme que ambos os servidores estão rodando
4. Tente recarregar a página (Ctrl+R)

### Validações não funcionam
**Solução**: Isso é esperado! O Zod valida:
- Título vazio
- Sinopse com menos de 10 caracteres
- Duração zero ou negativa
- Data retroativa para sessões

---

## 📂 Estrutura de Dados (db.json)

Após usar o sistema, seu `db.json` terá dados como:

```json
{
  "filmes": [
    {
      "id": "1",
      "titulo": "Vingadores: Ultimato",
      "sinopse": "Os heróis enfrentam Thanos...",
      "genero": "Ação",
      "classificacao": "12",
      "duracao": 181,
      "elenco": "Robert Downey Jr., Chris Evans",
      "dataInicio": "2025-12-15",
      "dataFim": "2026-01-15"
    }
  ],
  "salas": [...],
  "sessoes": [...],
  "ingressos": [...]
}
```
