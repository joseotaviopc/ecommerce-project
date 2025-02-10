# Projeto de E-Commerce

## Visão Geral

Este é um aplicativo web de e-commerce que permite aos usuários navegar por produtos, adicioná-los ao carrinho e gerenciar sua experiência de compra. O projeto consiste em um frontend construído com React e um backend construído com Node.js e Express.

## Requisitos Implementados

- Listagem de produtos
- Funcionalidade de carrinho de compras
- Design responsivo para dispositivos móveis e desktop
- Integração com um banco de dados MongoDB

## Requisitos Não Implementados

- Autenticação de usuários
- Cache com Redis
- Testes no frontend

## Como Rodar o Projeto

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [MongoDB](https://www.mongodb.com/) ou um serviço de MongoDB em nuvem (como MongoDB Atlas)
- [Docker](https://www.docker.com/) (opcional, para rodar os serviços em contêineres)

## Passos para Configuração

1. **Clone o repositório:**

```bash
git clone https://github.com/joseotaviopc/ecommerce-project.git
cd ecommerce-project
```

## Configuração do Backend:

1. **Instalar dependências:**

- Navegue até a pasta do backend:
```bash
cd backend
```

- Instale as dependências:
```bash
npm install
```

2. **Configuração do Banco de Dados (via docker):**

- Crie um arquivo .env.development e adicione as variáveis de ambiente necessárias, como MONGODB_URI para rodar o banco pelo docker.
```env
MONGODB_URI="mongodb://root:example@localhost:27017/mydatabase?authSource=admin"
```

- Inicie o banco de dados:
```bash
npm run docker:mongo
```

3. **Configuração do Banco de Dados (via MongoDB Atlas):**

- Crie um arquivo .env.development e adicione as variáveis de ambiente necessárias, como MONGODB_URI para rodar o banco pelo MongoDB Atlas.

- Inicie o servidor:
```bash
npm run dev
```

- Acesse a documentação da API em http://localhost:3000/api/docs

## Configuração do Frontend:

1. **Instalar dependências:**

- Navegue até a pasta do frontend:
```bash
cd ../frontend
```

- Instale as dependências:
```bash
npm install
```

- Crie um arquivo .env.development e adicione a variável NEXT_PUBLIC_BASE_URL_PROD com a URL do backend.
```env
NEXT_PUBLIC_BASE_URL_PROD="http://localhost:3000"
```

- Inicie o servidor:
```bash
npm run dev
```

- Acesse o aplicativo em seu navegador em http://localhost:3001

## Deploy

- O projeto frontend está hospedado na Vercel e o backend no [Render](https://render.com/) via imagem docker.

- Para acessar o frontend, acesse: https://eco-front-eta.vercel.app/

- Para acessar o as rotas do backend, acesse: https://eco-back-latest.onrender.com/api/
