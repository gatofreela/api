# Gato Freela API

## Tecnologias usadas

- [NestJS](https://nestjs.com/)
- [Prisma](https://prisma.io/)
- [Plop](https://plopjs.com/)
- [Zod](https://zod.dev/)
- [Biome](https://biomejs.dev/)
- [Docker](https://www.docker.com/)

## Rotina de desenvolvimento

- Estamos utilizando Prisma para gerenciar o banco de dados.
- Estamos utilizando o Biome para formatar a aplicação fazer validação de tipagem.
- Estamos utilizando o Docker para simular o banco de dados.
- Estamos utilizando o plopFile para gerar arquivos de testes e serviços.
- Estamos utilizando o suporte do NestJS com supertest para implentar testes e2e.

### Escrevendo Services

Para implementar um novo service, execute o comando `npm run gen:service` e preencha o nome do service. O comando gera um arquivo na pasta services já importando o PrismaService e preparando o schema de validação. O comando também gera um arquivo de teste integrado ao banco de dados.

### Escrevendo testes E2E

Para testar rotas completas, utilize o comando `npm run gen:e2e` e preencha o nome do teste da rota. O arquivo de teste gerado vai montar a aplicação e preparar as chamadas da rota com o supertest.

### Cuidados com a implementação

Antes de todo commit, execute o comando `npm run pipe` para assegurar que a api está funcionando corretamente com tipagem correta, sem quebras na build e com todos testes funcionando. O comando executa a checagem de tipagem com o `biome check`, executa o build com `nest build` e executa os testes com `npm run test`.

## Executando a api

- Configure o arquivo `.env` utilizando chaves apropriadas apontando para serviços desejados
- Execute os seguintes comandos:

```bash
npm install
npm dev
```
