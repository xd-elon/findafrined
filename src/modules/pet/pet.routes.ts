// src/modules/user/user.routes.ts
import { FastifyInstance } from 'fastify';
import { PetController } from './pet.controller';
import { authenticate } from '../../common/middlewares/authenticate';

export async function petRoutes(fastify: FastifyInstance) {
  fastify.post('/pets', {preHandler: authenticate}, PetController.createPet);
  fastify.get('/pet/:id', {preHandler: authenticate}, PetController.findPetByID);
  fastify.get('/pets/:city', {preHandler: authenticate}, PetController.findPetByCity);
}