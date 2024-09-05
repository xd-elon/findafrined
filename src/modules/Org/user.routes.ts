// src/modules/user/user.routes.ts
import { FastifyInstance } from 'fastify';
import { UserController } from './user.controller';
import { authenticate } from '../../common/middlewares/authenticate';

export async function userRoutes(fastify: FastifyInstance) {
  //crud
  fastify.post('/users', UserController.createUser);
  fastify.get('/users', {preHandler: authenticate},  UserController.getAllUsers);
  fastify.get('/user',  {preHandler: authenticate}, UserController.getUserById);
  fastify.put('/users',  {preHandler: authenticate}, UserController.updateUser);
  fastify.delete('/users/:id', {preHandler: authenticate}, UserController.deleteUser);
  //features
  fastify.post('/user/login', UserController.loginUser);
}