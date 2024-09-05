import { Pet } from "@prisma/client";
import prisma from "../../config/db";

export class PetService {
  static async createPet(data: Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pet> {
    
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        description: data.description,
        city: data.city,
        org_id: data.org_id
      },
    });
    
    return pet
  }

  static async findMealByID(id: number): Promise<Pet | null> {
    const meal = await prisma.pet.findUnique({ where: { id }});

    return meal
  }

  static async findAllMeals(org_id: number): Promise<Pet[] | null> {

    const meal = await prisma.pet.findMany({ where: { org_id }});

    return meal
  }

  static async updateMeal(id: number, data: Partial<Pet>): Promise<Pet> {
    const updateData: any = { ...data };

    return prisma.pet.update({
      where: { id: id },
      data: updateData,
    });
  }

  static async deleteMeal(id: number): Promise<Pet> {
    return prisma.pet.delete({
      where: { id },
    });
  }

}
