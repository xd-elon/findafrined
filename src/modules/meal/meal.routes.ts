// src/modules/user/user.routes.ts
import { FastifyInstance } from 'fastify';
import { MealController } from './meal.controller';
import { authenticate } from '../../common/middlewares/authenticate';

export async function mealRoutes(fastify: FastifyInstance) {
  //crud
  fastify.post('/meals', {preHandler: authenticate}, MealController.createMeal);
  fastify.get('/meals/:id', {preHandler: authenticate}, MealController.findMealByID);
  fastify.get('/meals/user', {preHandler: authenticate}, MealController.findAllMeals);
  fastify.put('/meals/:id', {preHandler: authenticate}, MealController.updateMeal);
  fastify.delete('/meals/:id', {preHandler: authenticate}, MealController.deleteMeal);

  //feature
  fastify.get('/meals/metrics', {preHandler: authenticate}, MealController.metricsMeal);
}