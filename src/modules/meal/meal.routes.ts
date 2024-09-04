// src/modules/user/user.routes.ts
import { FastifyInstance } from 'fastify';
import { MealController } from './meal.controller';

export async function mealRoutes(fastify: FastifyInstance) {
  //crud
  fastify.post('/meals', MealController.createMeal);
  fastify.get('/meals/:id', MealController.findMealByID);
  fastify.get('/meals/user/:id', MealController.findAllMeals);
  fastify.put('/meals/:id', MealController.updateMeal);
  fastify.delete('/meals/:id', MealController.deleteMeal);

  //feature
  fastify.get('/meals/metrics/:id', MealController.metricsMeal);
}