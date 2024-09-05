import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    org: { org_id: number };  // ou qualquer outra estrutura que o JWT tenha
  }
}