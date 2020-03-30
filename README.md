<div align="center">
  <p align="center">
    <img src="https://svgshare.com/i/JYW.svg" alt="Be The Hero!" />
  </p>

  <h3>
    Seja o Herói de alguma ONG. Veja os incidentes cadastrados pelas ONG's e apoie alguma causa. Juntos somos mais fortes!
  </h3>
</div>

<br />

- [Overview](#overview)
- [Instalação Geral](#instala%c3%a7%c3%a3o-geral)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Mobile](#mobile)
- [TDD - Desenvolvimento Orientado por Testes (Test Driven Development)](#tdd---desenvolvimento-orientado-por-testes-test-driven-development)
- [Ferramentas e Bibliotecas Utilizadas](#ferramentas-e-bibliotecas-utilizadas)
- [Agradecimentos](#agradecimentos)

<br />

# Overview

Be The Hero foi desenvolvido na **Semana Omnistack 11.0**, promovida pela **[Rocketseat 🚀](http://www.rocketseat.com.br)**.
<br />
Esta ferramenta tem o intuito de ligar ONG's à financiadores. Através delas as ONG's poderão postar os casos e valores para solucioná-los. Os financiadores poderão ver todos os casos e entrar em contato com as ONG's com o intuito de financiá-los.
<br />
Na ferramenta estão inclusos o Backend ([ExpressJS](https://github.com/expressjs/express) + [SQLite](https://github.com/sqlite/sqlite)), Frontend ([ReactJS](https://github.com/facebook/react)) e Mobile ([React Native](https://github.com/facebook/react-native)).

<br />

# Instalação Geral

Não trataremos neste README da instalação de ferramentas como: NodeJS, Git,

1. Crie uma pasta para o seu projeto;
2. Dentro da pasta execute o comando para clonar o repositório:

   `$ git clone https://github.com/TiberioBrasil/semana-omnistack-11.git`

<br />

## Backend

1. Acesse a pasta do backend da sua aplicação;
2. Execue o comando abaixo para instalar todas as dependência do projeto:

   `yarn`

3. Crie um arquivo `.env` na raiz do projeto backend de acordo com o arquivo `.env.example`
4. Inicie o projeto utilizando o comando:

   `yarn start:dev`

5. Você pode testar as rotas da aplicação utilizando o arquivo do [Postman](https://www.postman.com/) que está na pasta raiz do projeto backend.

<br />

## Frontend

1. Acesse a pasta do frontend da sua aplicação;
2. Execue o comando abaixo para instalar todas as dependência do projeto:

   `yarn`

3. Inicie o projeto utilizando o comando:

   `yarn start`

<br />

## Mobile

1. Acesse a pasta do frontend da sua aplicação;
2. Execue o comando abaixo para instalar todas as dependência do projeto:

   `yarn`

3. Inicie o projeto utilizando o comando:

   `yarn start`

4. Será aberta uma página no navegador no endereço

   `http://localhost:19002/`

5. Baixe o aplicativo Expo no Google Play ou Apple Store, dependendo do seu aplicativo e escaneie o QCode contido nele.
6. Você conseguirá acessar a versão mobile do projeto através do seu celular.

<br />

# TDD - Desenvolvimento Orientado por Testes (Test Driven Development)

Foram realizados teste sde integrações em todos os endpoints da ferramenta. Para ajudar na criação de dados aleatórios doi utilizaod a biblioteca [Faker](https://github.com/marak/Faker.js).

<br />

# Ferramentas e Bibliotecas Utilizadas

- Ferramentas

  - [GitHub](https://github.com/)
  - [GitLab](https://gitlab.com/)
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Yarn](https://yarnpkg.com/)
  - [Postman](https://www.postman.com/)

<br />

- Bibliotecas
  - [ExpressJS](https://github.com/expressjs/express)
  - [Knex](https://github.com/knex/knex)
  - [SQLite](https://github.com/sqlite/sqlite)
  - [Faker](https://github.com/marak/Faker.js)
  - [ExpressJS/Cors](https://github.com/expressjs/cors)
  - [React](https://github.com/facebook/react)
  - [React Native](https://github.com/facebook/react-native)
  - [Axios](https://github.com/axios/axios)

<br />

# Agradecimentos

Muito obrigado à Rocketseat por sempre estar disponibilizando conteúdo atualizado totalmente grátis. Aconselho à todos estarem sempre de olho nas Semanas Omnistack e também no Bootcamp Go Stack. Além disso aconselho sempre à estarem presentes no Discord da comunidade.

- [Site Rocketseat](https://rocketseat.com.br/)
  - [Cursos Starter (100% gratuitos)](https://rocketseat.com.br/starter)
  - [Bootcamp GoStack](https://rocketseat.com.br/gostack)
- [Discord Rocketseat](https://discordapp.com/invite/gCRAFhc)

_Não possuo nenhuma ligação com a Rocketseat (pelo menos até o momento 🚀), porém acho maravilho o trabalho que eles vem fazendo com a comunidade JavaScript e nada mais justo que divulgar esse trabalho._
