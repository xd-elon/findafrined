import fastify from "fastify"
import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod"


const app = fastify()

async function snacksRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {

    const createUserSchema = z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
    })

    const { name, email, phone } = createUserSchema.parse(
      request.body
    )
    
    const user = {
      id: randomUUID(),
      name,
      email,
      phone
    }

    reply.send(user)
  })
}

async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {

    const createUserSchema = z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
    })

    const { name, email, phone } = createUserSchema.parse(
      request.body
    )
        
    const user = {
      id: randomUUID(),
      name,
      email,
      phone
    }

    reply.send(user)
  })
}

// console.log(process.PORT)

app.listen({
  port: 3333
}).then(() => {
  console.log('--- server running ---')
})
