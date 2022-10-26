# E-Commerce - Backend

Projeto para simular o funcionamento de um e-commerce.

## O que foi usado?
- Bcrypt (criptografia de senha)
- Body-Parser (criar um parse com base na requisição)
- Consign (carregador das funcionalidades)
- Express (serviço baseado em JS)
- Knex (ajuda nas consultas e na conexão com o banco de dados)
- Moment (para horários)
- Jwt
- Passport (credenciais)

## Algumas coisas vistas
- (req, res, next) são importantes. Referentes a (req)uest, (res)olve e next (próximo)
- Parâmetros vindos da URL vem do (req)uest `req.params.valor` com :
- Para mais de um parâmetro, usa Query String `req.query.nome`, sendo representado por ? e &
- Migration: módulo do Node que consiste em uma sequência de chamadas para que consiga construir o banco de dados
- Consign associa as informações dentro do Index. Espera que a chamada seja apenas uma função
- ExtractJwt: extrai da requisição as autorizações e tokens
- **Knex precisa ser instalado globalmente**
- Para o login, existe um token que passa pelo Header da requisição. é necessário informar `bearer [TOKEN QUE VEM DO POSTMAN]`

## Como executar?
- É necessário ter as dependências instaladas `npm i`
- Necessário ter o Postgres instalado

### Para o Backend
- Acessar o terminal na pasta backend e digitar `npm start`, apenas.

### Para o Postgres
- Digitar o comando `cmd.exe /c chcp 1252`
- Logar: `psql -U postgres`. O usuário tem que ser criado pelo pgAdmin
- Criar um usuário (utilizei como nome **postgres**): `CREATE USER postgres`
- Criar um banco de dados: `CREATE DATABASE [nome]`
- Conectar ao banco de dados (ou database): `\c {NOME DO BANCO}`

### Para o Knex
- Comando para início: `knex init`
- Comando para criação de tabela (criei três): `knex migrate:make [nome da tabela]`
- Comando para executar as Migrations: `knex migrate:latest`
- Comando para atualizar as Migrations: `knex migrate:rollback`
