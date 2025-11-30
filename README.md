# 🧪 Testes de API – DESAFIO-API-QA (Cypress)

Automação de testes de API utilizando **Cypress**, com geração de dados dinâmicos via **Faker**, comandos customizados e cenários cobrindo os principais endpoints da API Serverest.

---

## 📦 Tecnologias Utilizadas

- 🚀 Cypress (Testes de API)
- 🎭 @faker-js/faker
- ⚙️ Node.js / npm
- 🔐 dotenv (.env)
- 📜 JavaScript ES6+

---

# 🚀 Como Rodar o Projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Samuelolie/desafio-api-QA
cd desafio-api-QA
```

## 2️⃣ Instalar dependências

```bash
npm install
```

---

# ⚙️ Variáveis de Ambiente (ENV)

Crie o arquivo:

📁 **.env**

```dotenv
BASE_URL="https://serverest.dev/"
```

Para usar dentro do Cypress:

```js
Cypress.env("BASE_URL");
```

O Cypress automaticamente lê `.env` quando configurado em `cypress.config.js`.

---

# 👤 Geração de Dados Fake (Faker)

Utilizamos o Faker para gerar dados dinâmicos em **usuarios**, **produtos** e **carrinhos**.

Exemplo:

```js
import { faker } from "@faker-js/faker";

const nome = faker.person.firstName();
const preco = faker.number.int({ min: 1, max: 500 });
const quantidade = faker.number.int({ min: 1, max: 100 });
const descricao = faker.lorem.word(5);
const email = faker.internet.email();
```

---

# 🧩 Comandos Customizados (Cypress Commands)

Local:
📁 `cypress/support/request/*`  
📁 `cypress/support/commands.js`

Exemplo:

### 🔹 Login

```js
cy.loginRequest(baseUrl, null, body);
```

### 🔹 Criar Produto

```js
cy.registerProductRequest(baseUrl, header, productBody);
```

### 🔹 Criar Carrinho

```js
cy.registerCartRequest(baseUrl, header, cartBody);
```

### 🔹 Buscar por filtros

```js
cy.searchProductRequest(baseUrl, null, { nome: "Mouse" });
```

---

# 📁 Estrutura do Projeto

```
desafio-api-qa/
 ├── cypress/
 │    ├── e2e/
 │    │    ├── login/
 │    │    │    └── login.cy.js
 │    │    ├── user/
 │    │    │    └── user.cy.js
 │    │    ├── product/
 │    │    │    └── product.cy.js
 │    │    ├── cart/
 │    │         └── cart.cy.js
 │    ├── fixtures/
 │    │    ├── bodyLogin.json
 │    │    ├── bodyUserRegister.json
 │    │    ├── bodyProductRegister.json
 │    │    ├── bodyCart.json
 │    ├── support/
 │         ├── request/
 │         │    ├── login.js
 │         │    ├── user.js
 │         │    ├── product.js
 │         │    ├── cart.js
 │         ├── commands.js
 │         ├── e2e.js
 ├── .env
 ├── cypress.config.js
 ├── package.json
 └── README.md
```

---

# 🧭 Cenários Testados – API

## 🔐 LOGIN

### ✔ Login com sucesso
- Retorna status 200
- Gera token Bearer válido

### ❌ Login com email incorreto
- Retorna mensagem de erro apropriada

### ❌ Login com senha incorreta
- Retorna mensagem de erro apropriada

### ❌ Login com credenciais inválidas
- Retorna mensagem de erro apropriada
---

## 👤 USUÁRIOS

### ✔ Buscar usuários
- Lista existente  
- Valida array e quantidade

### ✔ Criar usuário
### ✔ Buscar usuário por filtro
### ✔ Deleta usuário cadastrado

---

## 📦 PRODUTOS

### ✔ Criar produto
### ✔ Buscar produto
### ✔ Buscar produto por filtro
### ✔ Deletar produto

---

## 🛒 CARRINHOS

### ✔ Criar carrinho
- Reduz quantidade em estoque automaticamente

### ✔ Buscar carrinho
### ✔ Deletar carrinho

---


# 🎉 Conclusão

Este projeto apresenta:

- Automação completa de API  
- Fluxos positivos e negativos  
- Estrutura modular e escalável  
- Uso de Faker para dados dinâmicos  
- Suporte a variáveis de ambiente  
- Validação completa de endpoints REST  

Pronto para evolução e integração em pipelines CI/CD 🚀

