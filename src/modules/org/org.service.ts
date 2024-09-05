import jwt from 'jsonwebtoken';
import prisma from "../../config/db";
import { hashPassword, isValidPassword } from './org.validation';

import { Org } from '@prisma/client';

export class OrgService {
  static async createOrg(data: Omit<Org, 'id' | 'createdAt' | 'updatedAt'>): Promise<Org> {
    // Validação de lógica de negócios
    const alreadyExistOrg = await prisma.org.findUnique({ where: { email: data.email } })

    if (alreadyExistOrg) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hashPassword(data.password);

    const org = await prisma.org.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        andress: data.andress,
        whats: data.whats
      },
    });

    return org
  }

  static async loginOrg(email: string, password: string): Promise<string> {

    const org = await prisma.org.findUnique({ where: { email } });

    if (!org || !isValidPassword(password, org.password)) {
      throw new Error('Invalid credentials');
    }

    // Gerar JWT
    const token = jwt.sign(
      { org_id: org.id,  }, 
      process.env.JWT_SECRET!, 
      { expiresIn: '1h' }
    );

    console.log("log")

    return token;
  }
}
