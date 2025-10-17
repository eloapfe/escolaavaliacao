# escolaavaliacao

# Sistema de Controle de Turmas e Atividades de Professores

Este projeto tem como objetivo auxiliar professores no gerenciamento de turmas e atividades, permitindo o cadastro, listagem e exclusão de turmas, além do registro e visualização de atividades.

O sistema também inclui autenticação de usuário (login/logout) e foi desenvolvido com foco em simplicidade e organização pedagógica.

# Requisitos de Infraestrutura
#### Sistema de Gerenciamento de Banco de Dados (SGBD)
- SGBD: MySQL
- Versão recomendada: 8.0+ (recomendado) 

# Servidor de Aplicação
- Backend: Node.js com Express
- Versão recomendada: Node.js 18.0+
- Servidor HTTP: Express.js
- Hospedagem: Vercel

# Sistema Operacional indicado
- Ambiente de desenvolvimento: Windows 10+, macOS 12+ ou Linux Ubuntu 22.04+
- Requisitos mínimos:
  - CPU Dual Core
  - 4 GB RAM
  - Conexão com internet

# Linguagem de Programação
- Frontend: HTML, CSS e JavaScript
- Backend: JavaScript, Node.js, Express, Prisma ORM 
- Banco de dados: MySQL

# Como Testar o Sistema

### Inicie o banco de dados

- Certifique-se de que o MySQL está rodando.
- Crie o banco de dados com o nome turmaDB.

### Inicie o servidor Node.js

npm start server.js 
ou 
nodemon server.js

>[!NOTE] 
> A API será iniciada e estará pronta para receber requisições.

### Acesse o sistema web

- Abra o arquivo index.html na pasta */escolaavaliacao* ou execute o servidor local.
- Faça login com um professor cadastrado.

### Funcionalidades para testar:

 - Autenticação de professor (login/logout)
 - Cadastro de turma
 - Listagem de turmas do professor
 - Exclusão de turma
 - Cadastro de atividades para uma turma
 - Listagem de atividades da turma

### Verificação do banco

- Utilize o Terminal SQL (Git Bash)
#### Execute consultas como:

SELECT * FROM professores;
SELECT * FROM turmas;
SELECT * FROM atividades;


#### Diagrama de Casos de Uso (DCU)
<p align="center">
  <img src="./docs/img/DCU.png" alt="Diagrama de Casos de Uso" style="width:80%; height:auto;">
</p>

#### Diagrama entidade relacionamento (DER)
<p align="center">
  ![alt text](image.png)
  ![alt text](image.png)
</p>

# Desenvolvido por

- Aluna: Eloá Pereira Florêncio
- Instituição: SENAI