import { FastifyRequest, FastifyReply } from "fastify";
import { MealService } from "./meal.service";
import { Meal } from "@prisma/client";

export class MealController {
  static async createMeal(req: FastifyRequest<{ Body: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'> }>, reply: FastifyReply) {
    try {
      const meal = await MealService.createMeal(req.body)

      reply.code(201).send(meal);
    } catch (error) {
      reply.code(500).send(error);
    }
  }

  static async findMealByID(req: FastifyRequest<{ Params: { id: number} }>, reply: FastifyReply) {
    try {
      console.log(req.user)
      const user = await MealService.findMealByID(Number(req.params.id));
      if (!user) {
        reply.code(404).send({ error: 'Meal not found' });
      } else {
        reply.code(200).send(user);
      }
    } catch (error) {
      reply.code(500).send({ error: 'Failed to fetch Meal' });
    }
  }

  static async findAllMeals(req: FastifyRequest<{ Params: { id: number} }>, reply: FastifyReply) {
    try {
      const user = await MealService.findAllMeals(Number(req.params.id));
      if (!user) {
        reply.code(404).send({ error: 'Meal not found' });
      } else {
        reply.code(200).send(user);
      }
    } catch (error) {
      reply.code(500).send({ error: 'Failed to fetch Meal' });
    }
  }

  static async updateMeal(req: FastifyRequest<{ Params: { id: number }, Body: Partial<Meal> }>, reply: FastifyReply) {
    try {
      const user = await MealService.updateMeal(Number(req.params.id), req.body);
      reply.code(200).send(user);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to update meal' });
    }
  }

  static async deleteMeal(req: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    try {
      await MealService.deleteMeal(Number(req.params.id));
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({ error: 'Failed to delete meal' });
    }
  }

  static async metricsMeal(req: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    try {
      const result = await MealService.metricsMeal(Number(req.params.id));
      reply.code(201).send(result);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to find metrics meal' });
    }
  }
}