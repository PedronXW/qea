# Teste Técnico para Desenvolvedor Backend Yazo

Esta aplicação é uma API desenvolvida com NodeJS, utilizando Typescript e o framework Express, ela tem por objetivo ser um serviço de perguntas e respostas com autenticação de seus usuários. Além dos elementos já citados ela também utiliza de bancos de dados PostgreSQL, gerenciado pela aplicação com a utilização de um ORM chamado Prisma, além dele, outra forma de armazenar dados empregada é a utilização de Redis.

Como padrões arquiteturais foram adotadas estratégias como DDD, Clean Architecture e SOLID. A aplicação é desenvolvida em camadas que aplicam o princípio da inversão de dependência. O caminho lógico de cada requisição é chegar ao seu Endpoint, ser redirecionado para o Controller que fara a verificação dos requisitos solicitações para a executação da ação solicitada e, se os requisitos foram supridos, então redicionar para o Service dentro do domínio da aplicação que fara a execução da atividade e o retorno de dados quando for necessário.

## Instruções para inicialização:

Toda a aplicação é desenvolvida em containers, com Docker, e esses são administrados com Docker compose, então para iniciar corretamente a aplicação é necessário iniciar todos os containers e executar os comandos de iniciação ("npm run start:dev" para o sistema em estado de desenvolvimento ou "npm run build" seguido de "npm run start" para ambiente de produção).

## Testes

Os testes são escritos utilizando o framework Jest, ele é utilizado em todos os tipos de teste e facilita o processo de gerenciamento dos ambientes além da própria execução, e a biblioteca Supertest, utilizada para criar uma instancia da aplicação e tornar possível as requisições dos testes E2E.

## Particularidades

### Recuperação de senha

O sistema de recuperação de senha exige que o usuário passe um email para que o token de recuperação seja enviado para seu email e através dele seja possível alterar sua senha, porém, para realizar o envio de email é necessário um sistema de SMTP, então não fiz a implementação desta forma. Esta funcionalidade foi implementada neste sistema retornando o token atráves da própria rota de solicitação de token. Isto não deve ser utilizado em produção pois permite que qualquer pessoa que saiba o email de outro usuário troque sua senha e faça uso de sua conta, fiz esta implementação somente para apresentar um sistema um pouco mais completo de autenticação.

### Exclusão de conta

A autenticação desta aplicação é implementada com base em tokens JWT com períodos curtos de expiração e sem utilizar de sistemas de refresh-token com esta implementação, mesmo que um usuário exclua sua conta, seu token fica ativo até que expire. Visando interromper a possibilidade de acesso de usuários já excluídos, a autenticação só é permitida para usuários ativos e a aplicação lista os usuários excluídos em um banco de dados no Redis por duas horas, até que seu token seja expirado. Todas as solicitações à API, que necessitem de autenticação, verificam se o usuário solicitando consta na lista de exclusão junto ao Redis.
