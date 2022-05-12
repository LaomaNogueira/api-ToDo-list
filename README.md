<h1 align="center"> Api Rest Lista de Tarefas - Nodejs </h1>

<h2>Índice</h2>

- <a href="#sobre">Sobre
    - <a href="#funcionalidades">Funcionalidades da API
- <a href="#tecnologias">Tecnologias
- <a href="#iniciando-projeto">Iniciando o Projeto
    - <a href="#requisitos">Pré-requisitos
    - <a href="#instalacao">Instalação
    - <a href="#uso">Uso
- <a href="#rotas">Rotas
    - <a href="usuarios">Usuários
    - <a href="tarefas">Tarefas
- <a href="#contato">Contato

<hr>

<h2 id="sobre">Sobre</h2>

<p align="left">API Rest em Typescript com Node.js, banco de dados SQLite. Possui CRUD de usuários e tarefas. Filtra as tarefas por usuário, por termo e por período de data. E altera a tarefa para concluída.
</p>

<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message= EM%20DESENVOLVIMENTO &color=&style=for-the-badge"/>
</p>

<hr>

<h3 id="funcionalidades">Funcionalidades da API:</h3>

- [x] cadastro de usuários ou tarefas
- [x] lista todos os usuários ou tarefas
- [x] lista usuário ou tarefa por ID
- [x] lista tarefas por usuário
- [x] atualiza usuário ou tarefa
- [x] deleta usuário ou tarefa
- [x] altera o status da tarefa para concluída

<hr>

<!-- TECHNOLOGIES -->

<h2 id="tecnologias">Tecnologias</h2>
  
  - [TypeScript](https://www.typescriptlang.org/download)
  - [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
  - [NodeJS](https://nodejs.org/en/)
  - [SQLite3](https://www.sqlite.org/index.html)
  - [Framework Express](https://expressjs.com/pt-br/)
  - [TypeORM](https://typeorm.io/)

<hr>

<h2 id="iniciando-projeto">Iniciando o Projeto</h2>

<h3 id="requisitos">Pré-requisitos</h3>

1. Node JS

  ```sh
  https://nodejs.org/en/
  ```

2. Npm ou Yarn

  ```sh
  https://www.npmjs.com/
  ```

3. SQLite3
  ```sh
  https://www.sqlite.org/index.html
  ```

<hr>


<h3 id="instalacao">Instalação</h3>

1. Clonar o repositório:

   ```sh
   git clone https://github.com/LaomaNogueira/api-ToDo-list.git
   ```
   ```
   cd api-ToDo-list
   ```

2. Instalar os pacotes:

   ```sh
   npm install
   ```
<hr>

<h3 id="uso">Uso</h3>

1. Copie o arquivo `.env.example`, renomeie para `.env`, crie suas variáveis de ambiente e substitua-as.


2. Subir o servidor:

   ```sh
   npm start:dev
   ```


3. Rodar os testes conforme indicado abaixo.

<hr>

<h2 id="rotas">Rotas</h2>

Com a API em funcionamento, vamos rodar os testes via [Insomnia](https://insomnia.rest/download) (ou algum similar). Seguem os testes:

<h3 id="usuarios"> <u>Usuários:</u></h3>

#### *POST*:

- __<u>Cadastrar novo usuário</u>__ - rota: *http://localhost:8000/api/v1/user/*

  Preencher o JSON, conforme exemplo:

  ```
  {
    "name": "Ada Lovelace",                      |  Required   |   String   |   
    "email": "ada_lovelace@corp.com",            |  Required   |   String   |   Formato: email@corp.com. Email que não exista na base de dados
    "password": "Senha12345",                    |  Required   |   String   |   Números ou letras maiúsculas e minúsculas, entre 8 e 20 caracteres
  }
  ```

  RETORNO:

  ```
  {
    "id": "55ed23df-cd3b-4dec-828c-c82de34818af",
    "name": "Ada Lovelace",                         
    "email": "ada_lovelace@corp.com",            
    "password": "Senha12345",                     
    "updatedAt": "2022-05-09T21:35:01.931Z",
    "createdAt": "2022-05-09T21:35:01.931Z",    
    "deletedAt": null                                           
  }
  ```

#### *GET*:

- __<u>Listar todos os usuários</u>__ - rota: *http://localhost:8000/api/v1/user/*
  - Retornos JSON possíveis:
    - Caso seja informada a page e a perPage na query, retorna os usuários paginados, conforme número por página e o total de usuários cadastrados no BD;
    - Caso não seja informada a page e a perPage na query, retorna todos os usuários cadastrados no BD;
    - Caso não hajam usuários cadastrados, retorna um array vazio.
  - Query:  page = INT, perPage = INT
  
  RETORNO:
  
    ```
    {
        "users":[
            {
                "id": "55ed23df-cd3b-4dec-828c-c82de34818af",
                "name": "Ada Lovelace",                         
                "email": "ada_lovelace@corp.com",            
                "password": "Senha12345",                     
                "updatedAt": "2022-05-09T21:35:01.931Z",
                "createdAt": "2022-05-09T21:35:01.931Z",    
                "deletedAt": null                                           
            }
        ],
        "total": 1
    }
    ```

- __<u>Listar um usuários</u>__ - rota: *http://localhost:8000/api/v1/user/{userID}*
  - Informar o ID do usuário a ser listado no parâmetro.
  - Retornos possíveis:
    - Caso seja informado um ID cadastrado no banco retorna o usuário;
    - Caso não haja usuário cadastrado com o ID informado, retorna o erro: <code> {404 - message: Cadastro não encontrado} </code>
  
  RETORNO:
  
    ```
    {
        "id": "55ed23df-cd3b-4dec-828c-c82de34818af",
        "name": "Ada Lovelace",                         
        "email": "ada_lovelace@corp.com",            
        "password": "Senha12345",                     
        "updatedAt": "2022-05-09T21:35:01.931Z",
        "createdAt": "2022-05-09T21:35:01.931Z",    
        "deletedAt": null                                           
    }
    ```

#### *PUT*:

- __<u>Atualizar um usuário</u>__ - rota: *http://localhost:8000/api/v1/user/{userID}*
  - Informar o ID do usuário a ser atualizado no parâmetro.
  - ID não pode ser atualizado, caso seja informado no corpo da requisição, será ignorado.
  - Caso não haja usuário cadastrado com o ID informado, retorna o erro: <code> {404 - message: Cadastro não encontrado} </code>

  Preencher o JSON, conforme exemplo:

  ```
  {
    "name": "Ada Lovelace",                      |             |   String   |   
    "email": "ada_lovelace2@corp.com",           |             |   String   |   Formato: email@corp.com. Email que não exista na base de dados
    "password": "Senha1234567",                  |             |   String   |   Números ou letras maiúsculas e minúsculas, entre 8 e 20 caracteres
  }
  ```

  RETORNO:

  ```
  {
    "id": "55ed23df-cd3b-4dec-828c-c82de34818af",
    "name": "Ada Lovelace",                         
    "email": "ada_lovelace2@corp.com",            
    "password": "Senha1234567",                     
    "updatedAt": "2022-05-09T21:35:01.931Z",
    "createdAt": "2022-05-09T21:35:01.931Z",    
    "deletedAt": null                                           
  }
  ```

#### *DELETE*:
- __<u>Deletar um usuário</u>__ - rota: *http://localhost:8000/api/v1/user/{userID}*
  - Informar o ID do usuário a ser deletado no parâmetro.
  - Caso não haja usuário cadastrado com o ID informado, retorna o erro: <code> {404 - message: Cadastro não encontrado} </code>
  
  RETORNO:

  ```
  {
    "message": "deleted",
    "user": {
        "id": "16de5083-1b00-4e31-bab2-3859ca7d54ee",
        "name": "Grace Hopper",
        "email": "grace.hopper@gmail.com",
        "password": "123456Senha",
        "createdAt": "2022-05-06T14:09:31.0",
        "updatedAt": "2022-05-09T21:31:20.0",
        "deletedAt": null
    }
  }
  ```

<h3 id="tarefas"><u>Tarefas:</u></h3>

#### *POST*:

- __<u>Cadastrar nova tarefa<u>__ - rota: *http://localhost:8000/api/v1/task/*

  Preencher o JSON, conforme exemplo:

  ```
  {
    "title": "Ir ao médico",                         |  Required   |   String   |
    "endDate": "2022-06-01",                         |  Required   |   Date     |   Formato: YYYY-MM-DD
    "category": "Consultas",                         |  Required   |   String   |
    "userId": "55ed23df-cd3b-4dec-828c-c82de34818af" |  Required   |   String   |   Formato: UUID
  }
  ```

  RETORNO:

  ```
  {
    "id": 395637c8-ff25-4bf0-9a71-9e6c2817e1ef,
    "title": "Ir ao médico",
    "endDate": "2022-06-01",
    "category": "Consultas",
    "done": false,
    "userId": "55ed23df-cd3b-4dec-828c-c82de34818af"
    "updatedAt": "2022-05-10T21:35:01.931Z",
    "createdAt": "2022-05-10T21:35:01.931Z", 
    "deletedAt": null, 
  }
  ```

#### *GET*:

- __<u>Listar todas as tarefas ou conforme filtros</u>__ - rota: *http://localhost:8000/api/v1/task/*
  - Retornos JSON possíveis:
    - Caso seja informada a page e a perPage na query, retorna as tarefas paginadas, conforme número por página e o total de tarefas cadastradas no BD;
    - Caso não seja informada a page e a perPage na query, retorna todas as tarefas cadastradas no BD;
    - Caso não hajam tarefas cadastradas, retorna um array vazio.
    - Caso seja informado uma data inicial e uma data final, retorna as tarefas referente ao período por data de término;
    - Caso seja informado um termo, retorna todos as tarefas que incluam o termo no título ou categoria;
    - Caso não seja informado o termo, filtra por título, categoria ou concluída, conforme a query informada;
    - OBS.: os filtros podem ser combinados;
    - Caso seja informado um ID inválido, retorna um array vazio.
  - Query:  page = INT, perPage = INT, startTaskDate = STRING(YYYY-MM-DD), endTaskDate = STRING(YYYY-MM-DD), 
            term = STRING, title = STRING, category = STRING, done = BOOLEAN
  
  RETORNO:
  
    ```
    {
        "tasks": [
            {
                "id": "1e4bb1ba-5032-4a4f-9c23-57d2a8c1428f",
                "title": "Arroz",
                "endDate": "2022-11-10T21:00:00.0",
                "category": "Compras",
                "done": true,
                "userId": "91b025e2-897f-4237-8d3e-65b33bf722a2",
                "createdAt": "2022-05-06T18:09:58.0",
                "updatedAt": "2022-05-09T21:04:40.0",
                "deletedAt": null
            }
        ],
        "total": 1
    }
    ```

- __<u>Listar uma tarefa</u>__ - rota: *http://localhost:8000/api/v1/task/{taskID}*
  - Informar o ID da tarefa a ser listada no parâmetro.
  - Retornos possíveis:
    - Caso seja informado um ID cadastrado no banco retorna a tarefa;
    - Caso não haja tarefa cadastrada com o ID informado, retorna o erro: <code> {404 - message: Cadastro não encontrado} </code>
  
  RETORNO:
  
    ```
    {
        "id": "395637c8-ff25-4bf0-9a71-9e6c2817e1ef",
        "title": "Ir ao médico",
        "endDate": "2022-05-31T21:00:00.0",
        "category": "Consultas",
        "done": false,
        "userId": "55ed23df-cd3b-4dec-828c-c82de34818af",
        "createdAt": "2022-05-09T21:48:28.0",
        "updatedAt": "2022-05-09T21:48:28.0",
        "deletedAt": null,
        "user": {
            "id": "55ed23df-cd3b-4dec-828c-c82de34818af",
            "name": "Ada Lovelace",                         
            "email": "ada_lovelace@corp.com",            
            "password": "Senha12345",                     
            "updatedAt": "2022-05-09T21:35:01.931Z",
            "createdAt": "2022-05-09T21:35:01.931Z",    
            "deletedAt": null                                           
        }
    } 
    ```

- __<u>Listar tarefas por usuário</u>__ - rota: *http://localhost:8000/api/v1/task/user/{userID}*
  - Informar o ID da tarefa a ser listada no parâmetro e a page e perPage na query.
  - Retornos possíveis:
    - Caso seja informada a page e a perPage na query, retorna as tarefas do usuário paginadas, conforme número por página e o total de tarefas cadastradas no BD;
    - Caso não seja informada a page e a perPage na query, retorna todas as tarefas do usuário cadastradas no BD;
    - Caso não haja usuário cadastrado com o ID informado, retorna um array vazio.
    - Query:  page = INT, perPage = INT
  
  RETORNO:
  
    ```
    {
        "tasks": [
            {
                "id": "1e4bb1ba-5032-4a4f-9c23-57d2a8c1428f",
                "title": "Arroz",
                "endDate": "2022-11-10T21:00:00.0",
                "category": "Compras",
                "done": true,
                "userId": "91b025e2-897f-4237-8d3e-65b33bf722a2",
                "createdAt": "2022-05-06T18:09:58.0",
                "updatedAt": "2022-05-09T21:04:40.0",
                "deletedAt": null
            }
        ],
        "total": 1
    } 
    ```


#### *PUT*:

- __<u>Atualizar uma tarefa</u>__ - rota: *http://localhost:8000/api/v1/task/{taskID}*
  - Informar o ID da tarefa a ser atualizada no parâmetro.
  - Id e userId não podem ser atualizados no cadastro, caso sejam informados no corpo da requisição, serão ignorados;
  - Caso não haja tarefa cadastrada com o ID informado, retorna o erro: <code> {404 - message: Cadastro não encontrado} </code>

  Preencher o JSON, conforme exemplo:

  ```
  {
    "title": "Ir ao médico",                         |             |   String   |
    "endDate": "2022-05-31",                         |             |   Date     |   Formato: YYYY-MM-DD
    "category": "Consultas",                         |             |   String   |
    "done": false,                                   |             |   Boolean  |
    "userId": "55ed23df-cd3b-4dec-828c-c82de34818af" |             |   String   |   Formato: UUID
  }
  ```

  RETORNO:

  ```
    {
        "id": "395637c8-ff25-4bf0-9a71-9e6c2817e1ef",
        "title": "Ir ao médico",
        "endDate": "2022-05-31T21:00:00.0",
        "category": "Consultas",
        "done": false,
        "userId": "55ed23df-cd3b-4dec-828c-c82de34818af",
        "createdAt": "2022-05-09T21:48:28.0",
        "updatedAt": "2022-05-09T21:48:28.0",
        "deletedAt": null,
        "user": {
            "id": "55ed23df-cd3b-4dec-828c-c82de34818af",
            "name": "Ada Lovelace",                         
            "email": "ada_lovelace@corp.com",            
            "password": "Senha12345",                     
            "updatedAt": "2022-05-09T21:35:01.931Z",
            "createdAt": "2022-05-09T21:35:01.931Z",    
            "deletedAt": null                                           
        }
    }
  ```


#### *PATCH*:
- __<u>Altera o status da tarefa para concluída</u>__ - rota: *http://localhost:8000/api/v1/task/{taskID}*
    - Informar o ID da tarefa a ser marcada como concluída no parâmetro da requisição;
    - Caso não haja tarefa cadastrada com o ID informado, retorna o erro: <code> {404 - message: Cadastro não encontrado} </code>
    

    RETORNO:

    ```
    {
        "id": "03700059-614d-4121-a39e-652a4a0099df",
        "title": "Ir ao Dr. Marcelo",
        "endDate": "2022-03-31T21:00:00.0",
        "category": "Consultas",
        "done": true,
        "userId": "55ed23df-cd3b-4dec-828c-c82de34818af",
        "createdAt": "2022-05-09T21:44:21.0",
        "updatedAt": "2022-05-09T21:49:47.0",
        "deletedAt": null,
        "user": {
            "id": "55ed23df-cd3b-4dec-828c-c82de34818af",
            "name": "Bruna",
            "email": "teste@gmail.com",
            "password": "Teste123456",
            "createdAt": "2022-05-06T16:40:48.0",
            "updatedAt": "2022-05-06T16:40:48.0",
            "deletedAt": null
        }
    }
    ```
<hr>

#### *DELETE*:
- __<u>Deletar uma tarefa</u>__ - rota: *http://localhost:8000/api/v1/task/{taskID}*
  - Informar o ID da tarefa a ser deletada, no parâmetro da requisição.
  - Caso não haja tarefa cadastrada com o ID informado, retorna o erro: <code> {404 - message: Cadastro não encontrado} </code>
  
  RETORNO:

  ```
    {
        "message": "deleted",
        "user": {
            "id": "03700059-614d-4121-a39e-652a4a0099df",
            "title": "Ir ao Dr. Marcelo",
            "endDate": "2022-03-31T21:00:00.0",
            "category": "Consultas",
            "done": true,
            "userId": "55ed23df-cd3b-4dec-828c-c82de34818af",
            "createdAt": "2022-05-09T21:44:21.0",
            "updatedAt": "2022-05-09T21:49:47.0",
            "deletedAt": null,
            "user": {
                "id": "55ed23df-cd3b-4dec-828c-c82de34818af",
                "name": "Bruna",
                "email": "teste@gmail.com",
                "password": "Teste123456",
                "createdAt": "2022-05-06T16:40:48.0",
                "updatedAt": "2022-05-06T16:40:48.0",
                "deletedAt": null
            }
        }
    }
  ```


<hr>

<!-- CONTACT -->

<h2 id="contato">Contato</h2>

#### Laoma Nogueira

<p align="left"> 🤝 Se tiver interesse em conversar comigo, será ótimo trocar uma ideia com você! Estes são os meus contatos: </p>

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/LaomaNogueira)](https://github.com/LaomaNogueira)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/laoma-nogueira/)](https://www.linkedin.com/in/laoma-nogueira/)
<a href="mailto:laomanogueira@gmail.com" alt="gmail" target="_blank">
<img src="https://img.shields.io/badge/-Gmail-FF0000?style=flat-square&labelColor=FF0000&logo=gmail&logoColor=white&link=mailto:laomanogueira@gmail.com" /></a>

<hr>
