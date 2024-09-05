// src/modules/user/user.routes.ts
import { FastifyInstance } from 'fastify';
import { OrgController } from './org.controller';
import { authenticate } from '../../common/middlewares/authenticate';

export async function orgRoutes(fastify: FastifyInstance) {
  //crud
  fastify.post('/org', OrgController.createOrg);
  //features
  fastify.post('/org/login', OrgController.loginOrg);
}