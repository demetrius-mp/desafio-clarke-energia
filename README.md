# desafio-clarke-energia

> Desafio para a posição de engenheiro de software full-stack na Clarke Energia.

## Índice

- [desafio-clarke-energia](#desafio-clarke-energia)
  - [Índice](#índice)
  - [Tecnologias e plataformas](#tecnologias-e-plataformas)
  - [Scripts adicionais](#scripts-adicionais)
  - [Histórico do repositório](#histórico-do-repositório)
  - [Executando o projeto](#executando-o-projeto)
  - [Utilizando docker](#utilizando-docker)
    - [Sobre o docker neste projeto](#sobre-o-docker-neste-projeto)

## Tecnologias e plataformas

Tecnologias utilizadas:

- NextJS para uma experiência mais integrada entre o frontend (com React) e backend (com NodeJS).
- Cypress para teste de componentes e teste end-to-end.
- Graphql para tráfego de dados entre o backend e frontend.
- ShadcnUI para construir a interface e experiência do usuário.
- Vercel para deploy gratuito da aplicação (backend e fronted).
- Supabase para hospedagem gratuita do banco de dados PostgreSQL.

Plataformas utilizadas:

- Sistema operacional: Ubuntu 24.04.1 LTS
- NodeJS v20.10.0
- NPM v10.8.1
- Docker v27.2.1, build 9e34c9b
- Docker compose v2.29.2

## Scripts adicionais

- `npm run cypress:open`: inicializa o cypress para executar os testes automatizados.
- `npm run graphql:compile`: gera os tipos para o cliente graphql.
- `npm run lint:fix`: executa o eslint e corrige inconsistências.

## Histórico do repositório

Inicialmente desenvolvi apenas o frontend, com um projeto inicializado pelo [`vite`](https://vite.dev/) com react e typescript, devido a maior velocidade de desenvolvimento e pouca complexidade no projeto. Utilizei uma biblioteca de componentes chamada [`shadcn-ui`](https://ui.shadcn.com/) para construir a interface. Desde o início do projeto me preocupei em entregar uma experiência completa ao usuário, olhando não apenas para o "caminho feliz" da aplicação, mas também para outros fatores como estados de carregamento e estados de erro.

Para lidar com o backend, introduzi um servidor utilizando [`express`](https://expressjs.com/) devido à sua simplicidade e velocidade para desenvolver serviços simples. Também utilizei o [`prisma`](https://prisma.io/) para a camada de acesso ao banco de dados, devido à sua ferramenta para migrações automáticas, modelos compatíveis com typescript, e também o ecossistema de plugins.

Depois, movi o frontend e o backend para um projeto [`nextjs`](https://nextjs.org/). Além de proporcionar renderização de componentes do lado do servidor, esse framework disponibiliza algumas facilidades para lidar com carregamento de dados. Ao utilizar o [`react-hook-form`](https://react-hook-form.com/) para gerenciamento de formulários, em conjunto com [`zod`](https://zod.dev/) para validação de dados, e [`shadcn-ui/forms`](https://ui.shadcn.com/docs/components/form) para construção da interface dos formulários, e [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations), consegui entregar uma experiência integrada do backend ao frontend durante a submissão do formulário.

Com a aplicação funcionando por completo, implementei um dos diferenciais, que é a [utilização do docker](#utilizando-docker) para executar o projeto. A imagem do projeto web foi desenvolvida utilizando multi-stage build, reduzindo bastante o tamanho da imagem. Além disso, adicionei um `docker-compose.yml` com um serviço para o projeto web e outro para o banco de dados. Dessa forma, não é necessário instalar o projeto para executá-lo, basta utilizar o docker compose.

Apesar de conhecer algumas das vantagens do graphql nunca o havia utilizado em nenhum projeto. No entanto, rapidamente consegui aprender o suficiente para colocá-lo no projeto. A integração com o prisma por meio da biblioteca [`pothos`](https://pothos-graphql.dev/docs/plugins/prisma) e a integração com typescript por meio do [`graphql-codegen`](https://the-guild.dev/graphql/codegen) tornou a experiência de carregamento de dados bem fluída e simples de executar.

## Executando o projeto

> [!NOTE]  
> Caso queira executar somente em modo de produção, leia o guia [Utilizando docker](#utilizando-docker).

Depois de clonar o repositório, instale as dependências utilizando o `npm`:

```sh
npm i
```

Crie um arquivo `.env` com uma variável chamada `DATABASE_URL` contendo a URL para o seu banco de dados PostgreSQL. Para entender o formato da URL, leia [esse guia](https://www.prisma.io/docs/orm/overview/databases/postgresql#connection-url).

Depois, execute as migrações do banco de dados e gere o cliente para acesso ao banco com o seguinte comando:

```sh
npx prisma migrate dev
```

Esse comando também irá inserir os dados fictícios no banco de dados por meio de um seeder (que pode ser encontrado [aqui](/prisma/seed.ts)).

Por fim, inicie o servidor web utilizando o seguinte comando:

```sh
npm run dev
```

## Utilizando docker

Primeiro, crie um arquivo `.env` utilizando o `.env.example` como modelo. Você pode utilizar o seguinte comando para fazer uma cópia do arquivo `.env.example`:

```sh
cp .env.example .env
```

Utilize o seguinte comando para colocar a aplicação no ar utilizando docker compose. Esse comando irá subir o servidor web e um banco de dados postgresql. O servidor web estará disponível na porta 3000, e o banco de dados estará disponível na porta 5432.

```sh
docker compose up
```

Para adicionar os provedores de energia fictícios no banco de dados, utilize os seguintes comandos:

```sh
docker exec -it nextjs-web sh # acesse o shell do container

npx prisma db seed # executa o seeder do banco de dados
```

Para destruir os containers criados, utilize o seguinte comando:

```sh
docker compose down
```

> [!NOTE]  
> Caso você não consiga excluir a pasta `/pgdata`, utilize o comando `sudo chmod -R a+rw pgdata` para conseguir a permissão de escrita sobre a pasta. Depois basta excluir normalmente.

### Sobre o docker neste projeto

A imagem docker para o serviço web (nextjs) utiliza multi-stage build, o que permite um tamanho final de imagem reduzido.

Além disso, há um arquivo `docker-compose.yml` para executar o container web e o container com um banco de dados postgresql.

É importante notar que o tamanho final da imagem poderia ser ainda mais reduzido caso as linhas abaixo não existissem no `Dockerfile`:

```dockerfile
COPY --from=deps --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
```

Essas linhas foram necessárias para permitir que o seeder fosse executado de dentro do container, proporcionando uma experiência de execução que requer somente a instalação do `docker compose`.
