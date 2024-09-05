import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

export async function authenticate(request: FastifyRequest, reply: FastifyReply, done: Function) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { org_id: number };
    
    // Agora você pode definir `request.user`
    request.org = decoded;
    //done();
  } catch (err) {
    reply.code(401).send({ error: 'Invalid token' });
  }
}