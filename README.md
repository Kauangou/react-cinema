# 📽️ CineWeb -- Módulo Administrativo

Este documento apresenta uma visão geral do módulo administrativo do
sistema **CineWeb**, desenvolvido com **React**, **Vite** e
**TypeScript**, com o apoio de **JSON-Server** para simulação de uma API
REST. O objetivo do sistema é auxiliar a gestão interna de um cinema,
permitindo o cadastro e controle de filmes, salas, sessões e vendas de
ingressos.

## 📊 Diagrama UML

O diagrama a seguir descreve a modelagem proposta para o sistema, incluindo as entidades e seus relacionamentos principais:

![Digrama UML](frontend/src/assets/diagramaUML.png)

## 🎯 Objetivo Geral

O projeto tem como finalidade disponibilizar um módulo administrativo
que permita a operadores e gerentes registrarem e organizarem as
informações essenciais do cinema. Isso inclui os cadastros de filmes e
salas, o agendamento de sessões e o controle básico de vendas de
ingressos.

## 🚀 Tecnologias Utilizadas

- **React + Vite (TypeScript)**
- **React Router DOM**
- **Bootstrap + Bootstrap Icons**
- **Zod**
- **JSON-Server**

## 🗄️ Estrutura do Backend (db.json)

```json
{
  "filmes": [],
  "salas": [],
  "sessoes": [],
  "ingressos": []
}
```

## 📁 Funcionalidades Disponíveis

### 🎬 Filmes (/filmes)

- Visualização, cadastro e remoção.
- Informações: título, sinopse, duração, classificação, gênero e datas
  de exibição.

### 🏛️ Salas (/salas)

- Cadastro de salas com número e capacidade.

### 🕒 Sessões (/sessoes)

- Agendamento com seleção de filme, sala, data e horário.
- Listagem que combina dados de filmes e salas.

### 🎟️ Venda de Ingressos

- Venda associada a cada sessão.
- Opção de ingresso **inteira** ou **meia** com cálculo automático do
  valor.

## 📏 Validações Utilizadas (Zod)

### Filmes

- Título obrigatório.
- Duração maior que zero.
- Sinopse com mínimo de 10 caracteres.

### Sessões

- Seleção obrigatória de filme e sala.
- Data não retroativa.

## 🎨 Interface do Sistema

- Layout responsivo com Bootstrap Grid.
- Ícones via Bootstrap Icons.
- Feedback visual para erros de validação.
