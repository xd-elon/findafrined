// src/modules/user/user.routes.ts
import { FastifyInstance } from 'fastify';
import { PetController } from './pet.controller';
import { authenticate } from '../../common/middlewares/authenticate';

export async function petRoutes(fastify: FastifyInstance) {
  //crud
  fastify.post('/pets', {preHandler: authenticate}, PetController.createPet);

}