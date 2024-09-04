import { Meal } from "@prisma/client";
import prisma from "../../config/db";

export class MealService {
  static async createMeal(data: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Meal> {
    const meal = await prisma.meal.create({
      data: {
        name: data.name,
        description: data.description,
        time_curred: data.time_curred,
        and_diet: data.and_diet,
        user_id: data.user_id,
      },

    });

    return meal
  }

  static async findMealByID(id: number): Promise<Meal | null> {
    const meal = await prisma.meal.findUnique({ where: { id }});

    return meal
  }

  static async findAllMeals(user_id: number): Promise<Meal[] | null> {

    const meal = await prisma.meal.findMany({ where: { user_id }});

    return meal
  }

  static async updateMeal(id: number, data: Partial<Meal>): Promise<Meal> {
    const updateData: any = { ...data };

    return prisma.meal.update({
      where: { id: id },
      data: updateData,
    });
  }

  static async deleteMeal(id: number): Promise<Meal> {
    return prisma.meal.delete({
      where: { id },
    });
  }

  static async metricsMeal(user_id: number): Promise<any> {
    const numberOfMeals = await prisma.meal.count({ where: { user_id }})
    const mealsInDient = await prisma.meal.count({ where: { user_id, and_diet: true }})
    const notDiet = await prisma.meal.count({ where: { user_id, and_diet: false }})
    const meals = await prisma.meal.findMany({     
    where: {
      user_id,
      and_diet: true,
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },})

    const bestDietStreak = calculateBestDietStreak(meals);

    const metrics = {
      numberOfTotalMeal: numberOfMeals,
      numberInDiet: mealsInDient,
      numberNotDiet: notDiet,
      bestSequenceDietInDay: bestDietStreak
    }

    return metrics
  }
}

// Função para calcular a melhor sequência de dias consecutivos dentro da dieta
function calculateBestDietStreak(meals: { createdAt: Date }[]): number {
  if (meals.length === 0) return 0;

  let currentStreak = 1;
  let bestStreak = 1;

  for (let i = 1; i < meals.length; i++) {
    const previousDate = new Date(meals[i - 1].createdAt);
    const currentDate = new Date(meals[i].createdAt);

    const differenceInDays = (currentDate.getTime() - previousDate.getTime()) / (1000 * 3600 * 24);

    if (differenceInDays <= 1) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return bestStreak;
}