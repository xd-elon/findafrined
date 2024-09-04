import { FastifyRequest, FastifyReply } from "fastify";
import { MealService } from "./meal.service";
import { Meal } from "@prisma/client";


export class MealController {
  static async createMeal(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = req.body as Meal

      data.user_id = req.user.userId

      const meal = await MealService.createMeal(data)

      reply.code(201).send(meal);
    } catch (error) {
      reply.code(500).send(error);
    }
  }

  static async findMealByID(req: FastifyRequest, reply: FastifyReply) {
    try {
      const {id} = req.params as { id: number}

      const meal = await MealService.findMealByID(Number(id));
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
      const user = await MealService.findAllMeals(req.user.userId);
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

      const user = await MealService.updateMeal(Number(id), req.body as Meal);
      reply.code(200).send(user);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to update meal' });
    }
  }

  static async deleteMeal(req: FastifyRequest, reply: FastifyReply) {
    try {
      const {id} = req.params as { id: number}

      await MealService.deleteMeal(id);
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({ error: 'Failed to delete meal' });
    }
  }

  static async metricsMeal(req: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await MealService.metricsMeal(req.user.userId);
      reply.code(201).send(result);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to find metrics meal' });
    }
  }
}