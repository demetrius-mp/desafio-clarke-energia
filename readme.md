# desafio-clarke-energia

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

Essas linhas foram necessárias para permitir que o seeder fosse executado de dentro do container, proporcionando uma experiência de execução que requer somente a instalação do `docker compsoe`.
