# Gato Freela API

## Tecnologias usadas

- [NestJS](https://nestjs.com/)
- [Prisma](https://prisma.io/)
- [Biome](https://biomejs.dev/)
- [Docker](https://www.docker.com/)

## Rotina de desenvolvimento

- Estamos utilizando o Biome para formatar a aplicação fazer validação de tipagem.
- Estamos utilizando o Docker para simular o banco de dados.
- Estamos utilizando o suporte do NestJS com supertest para implentar testes e2e.

Antes de todo commit, execute o comando `npm run pipe` para assegurar que a api está funcionando corretamente com tipagem correta, sem quebras na build e com todos testes funcionando.

## Executando a api

- Configure o arquivo `.env` utilizando chaves apropriadas apontando para serviços desejados
- Execute os seguintes comandos:

```bash
npm install
npm dev
```
