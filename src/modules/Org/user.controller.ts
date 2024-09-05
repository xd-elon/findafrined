// src/modules/user/user.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from './user.service';
// import { User } from './user.model';
import { validateCreateUser } from './user.validation';
import { User } from '@prisma/client';

export class UserController {
  static async createUser(req: FastifyRequest<{ Body: Omit<User, 'id' | 'createdAt' | 'updatedAt'> }>, reply: FastifyReply) {
    try {
      const errors = validateCreateUser(req.body);

      if (errors.length > 0) {
        return reply.code(400).send({ errors });
      }

      const user = await UserService.createUser(req.body);

      reply.code(201).send(user);
    } catch (error) {
      console.log()
      reply.code(500).send(error);
    }
  }

  static async getUserById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const user = await UserService.getUserById(req.user.userId);
      if (!user) {
        reply.code(404).send({ error: 'User not found' });
      } else {
        reply.code(200).send(user);
      }
    } catch (error) {
      reply.code(500).send({ error: 'Failed to fetch user' });
    }
  }

  static async getAllUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await UserService.getAllUsers();
      reply.code(200).send(users);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to fetch users' });
    }
  }

  static async updateUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userid = req.user.userId
      const data = req.body as User
      const user = await UserService.updateUser(userid, data);
      reply.code(200).send(user);
    } catch (error) { 
      reply.code(500).send({ error: 'Failed to update user' });
    }
  }

  static async deleteUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      await UserService.deleteUser(req.user.userId);
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({ error: 'Failed to delete user' });
    }
  }

  static async loginUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = req.body as { email: string, password: string }

      const token = await UserService.loginUser(email, password)
      // console.log(token)
      reply.code(201).send({token});
    } catch (error) {
      reply.code(500).send({ error: 'Failed to delete user' });
    }
  }
}