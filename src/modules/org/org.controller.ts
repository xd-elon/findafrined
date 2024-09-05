// src/modules/user/user.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { Org } from '@prisma/client';

import { OrgService } from './org.service';
import { validateCreateUser } from './org.validation';

export class OrgController {
  static async createOrg(req: FastifyRequest<{ Body: Omit<Org, 'id' | 'createdAt' | 'updatedAt'> }>, reply: FastifyReply) {
    try {
      const errors = validateCreateUser(req.body);

      if (errors.length > 0) {
        return reply.code(400).send({ errors });
      }

      const org = await OrgService.createOrg(req.body);

      reply.code(201).send(org);
    } catch (error) {
      console.log()
      reply.code(500).send(error);
    }
  }

  static async loginOrg(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = req.body as { email: string, password: string }

      const token = await OrgService.loginOrg(email, password)
      // console.log(token)
      reply.code(201).send({token});
    } catch (error) {
      reply.code(500).send({ error: 'Failed to login org' });
    }
  }
}