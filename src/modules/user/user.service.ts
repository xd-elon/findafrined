import jwt from 'jsonwebtoken';
import prisma from "../../config/db";
//import { User } from './user.model';
import { hashPassword, isValidPassword } from './user.validation';
import { User } from '@prisma/client';

export class UserService {
  static async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // Validação de lógica de negócios
    const alreadyExistUser = await prisma.user.findUnique({ where: { email: data.email } })

    if (alreadyExistUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    return user
  }

  static async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  static async updateUser(userId: number, data: Partial<User>): Promise<User> {
    const updateData: any = { ...data };

    if (data.password) {
      updateData.password = await hashPassword(data.password);
    }
  
    return prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  static async deleteUser(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }

  static async loginUser(email: string, password: string): Promise<string> {

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !isValidPassword(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    // Gerar JWT
    const token = jwt.sign(
      { userId: user.id,  }, 
      process.env.JWT_SECRET!, 
      { expiresIn: '1h' }
    );

    return token;
  }
}
