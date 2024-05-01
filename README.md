# Teste Técnico para Desenvolvedor Backend Yazo

Esta aplicação é uma API desenvolvida com NodeJS, utilizando Typescript e o framework Express, ela tem por objetivo ser um serviço de perguntas e respostas com autenticação de seus usuários. Além dos elementos já citados ela também utiliza de bancos de dados PostgreSQL, gerenciado pela aplicação com a utilização de um ORM chamado Prisma, assim como a utilização de Redis, este último para gerenciamento de usuários excluídos.

Como padrões arquiteturais foram adotadas estratégias como DDD, Clean Architecture e SOLID. O caminho lógico de cada requisição é chegar ao seu Endpoint, ser redirecionado para o Controller que fara a verificação dos requisitos solicitações para a executação da ação solicitada e, se os requisitos foram supridos, então redicionar para o Service dentro do domínio da aplicação que fara a execução da atividade e o retorno de dados quando for necessário.

## Instruções para inicialização:

Toda a aplicação é desenvolvida em containers, e esses são administrados com Docker compose, então para iniciar corretamente a aplicação é necessário que todos os containers estejam em operação.

### Como iniciar a aplicação:

- Com um terminal aberto na página raiz do projeto, instale as dependencias do projeto com o comando "npm i".
- Rode o comando "docker compose up -d" e espere os containers ficarem disponíveis.
- Após o primeiro passo, entre no container da aplicação, com o comando "docker compose exec qea sh".
- Com os dois passos anteriores cumpridos, poderemos utilizar nossa aplicação. Se quisermos rodar os testes, podemos utilizar o comando "npm run test-e2e" ou "npm run test-unit", dependendo do tipo de testes que você quer executar.
- Se quiser iniciar a aplicação em produção execute os comandos "npm run build" e em seguida o comando "npm run start".
- Se quiser iniciar a aplicação em desenvolvimento execute o comando "npm run start:dev".

## Testes

Os testes são escritos utilizando o framework Jest, ele é utilizado em todos os tipos de teste e facilita o processo de gerenciamento dos ambientes além da própria execução, e a biblioteca Supertest, utilizada para criar uma instancia da aplicação e tornar possível as requisições nos testes E2E.

Os testes unitários estão presentes, principalmente, dentro do domínio da aplicação, na parte de Services e podem ser identificados ao analizar o nome dos arquivos, eles possuem final ".unit.spec.ts". Todos os testes unítarios utilizam de repositórios em memória para executar suas verificações, esses repositórios podem ser encontrados dentro da pasta "test", na raiz da aplicação.

Já os testes E2E podem ser encontrados na parte de infra estrutura da aplicação, junto com os controllers dos endpoints que eles estão testando. Estes testes funcionam utilizando da infraestrutura real da aplicação, ou seja, elas utilizam bancos de dados PostgreSQL e o próprio Redis. No caso do banco de dados, no ínicio dos testes é gerado um novo schema para que os dados sejam armazenados nele e este mesmo schema é resetado após cada um dos testes, criando um ambiente único e sem interferencias para cada teste. Já no caso do Redis, os testes utilizam o banco de dados "9" para realizarem suas verificações e, após cada teste, o este banco de dados também é resetado.

## Particularidades

### Recuperação de senha

O sistema de recuperação de senha exige que o usuário passe um email para que o token de recuperação seja enviado e através dele seja possível alterar sua senha, porém, para realizar o envio de email é necessário um sistema de SMTP, então não fiz a implementação desta forma. Esta funcionalidade foi implementada neste sistema retornando o token atráves da própria rota de solicitação de token. Isto não deve ser utilizado em produção pois permite que qualquer pessoa que saiba o email de outro usuário troque sua senha e faça uso de sua conta, fiz esta implementação somente para apresentar um sistema um pouco mais completo de autenticação.

### Exclusão de conta

A autenticação desta aplicação é implementada com base em tokens JWT com períodos curtos de expiração e sem utilizar de sistemas de refresh-token com esta implementação, mesmo que um usuário exclua sua conta, seu token ficaria ativo até que expire. Visando interromper a possibilidade de acesso de usuários já excluídos, a autenticação só é permitida para usuários ativos e a aplicação lista os usuários excluídos em um banco de dados no Redis por duas horas, até que seu token seja expirado. Todas as solicitações à API, que necessitem de autenticação, verificam se o usuário solicitando consta na lista de exclusão junto ao Redis, e só permitem que o processo continue se o usuário solicitante estiver com registro ativo.
