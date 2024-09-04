import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user: { userId: number };  // ou qualquer outra estrutura que o JWT tenha
  }
}