# Order Management API

API REST desenvolvida em **Node.js** com **Express** para gerenciamento de pedidos.  
Este projeto permite criar, consultar, listar, atualizar e deletar pedidos, armazenando os dados em **MongoDB**.

O objetivo desta API é demonstrar a implementação de um serviço backend simples com transformação de dados (mapping), tratamento de erros e uso adequado de códigos HTTP.

---

# Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/euclidescarlos/order-management-api.git
````

Entre na pasta do projeto:

```bash
cd order-management-api
```

Instale as dependências:

```bash
npm install
```

---

# Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/pedidosdb
```

---

# Executar a API

```bash
npm run dev
```

ou

```bash
node server.js
```

Servidor:

```
http://localhost:3000
```

---

# Endpoints da API

## Criar pedido

POST

```
/order
```

Exemplo de request:

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

---

## Obter pedido pelo número

GET

```
/order/:orderId
```

Exemplo:

```
/order/v10089015vdb-01
```

---

## Listar todos os pedidos

GET

```
/order/list
```

---

## Atualizar pedido

PUT

```
/order/:orderId
```

---

## Deletar pedido

DELETE

```
/order/:orderId
```

---

# Transformação de dados (Mapping)

A API recebe o JSON no seguinte formato:

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

Antes de salvar no banco, os dados são transformados para:

```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

---

# Códigos de resposta HTTP

| Código | Significado           |
| ------ | --------------------- |
| 200    | Sucesso               |
| 201    | Recurso criado        |
| 400    | Dados inválidos       |
| 404    | Pedido não encontrado |
| 409    | Pedido já existe      |
| 500    | Erro interno          |

---

# Tratamento de erros

A API possui tratamento de erros para:

* dados inválidos
* pedidos duplicados
* pedido não encontrado
* falhas no banco de dados

Todas as respostas retornam mensagens claras em JSON.

---

# Autor

Euclides Neto
Estudante de Análise e Desenvolvimento de Sistemas

