import { FastifyRequest, FastifyReply } from "fastify";
import { PetService } from "./pet.service";
import { Pet } from "@prisma/client";


export class PetController {
  static async createPet(req: FastifyRequest, reply: FastifyReply) {
    try {


      const pet = await PetService.createPet({...req.body as Pet, org_id: req.org.org_id})
      
      reply.code(201).send(pet);
    } catch (error) {
      reply.code(500).send(error);
    }
  }

  static async findMealByID(req: FastifyRequest, reply: FastifyReply) {
    try {
      const {id} = req.params as { id: number}

      const meal = await PetService.findMealByID(Number(id));
      if (!meal) {
        reply.code(404).send({ error: 'Meal not found' });
      } else {
        reply.code(200).send(meal);
      }
    } catch (error) {
      reply.code(500).send({ error: 'Failed to fetch Meal' });
    }
  }

  static async findAllMeals(req: FastifyRequest, reply: FastifyReply) {
    try {
      const user = await PetService.findAllMeals(req.org.org_id);
      if (!user) {
        reply.code(404).send({ error: 'Meal not found' });
      } else {
        reply.code(200).send(user);
      }
    } catch (error) {
      reply.code(500).send({ error: 'Failed to fetch Meal' });
    }
  }

  static async updateMeal(req: FastifyRequest, reply: FastifyReply) {
    try {
      const {id} = req.params as { id: number}

      const user = await PetService.updateMeal(Number(id), req.body as Pet);
      reply.code(200).send(user);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to update meal' });
    }
  }

  static async deleteMeal(req: FastifyRequest, reply: FastifyReply) {
    try {
      const {id} = req.params as { id: number}

      await PetService.deleteMeal(id);
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({ error: 'Failed to delete meal' });
    }
  }

}