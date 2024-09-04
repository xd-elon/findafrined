// src/modules/user/user.validation.ts

import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

export function validateCreateUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): string[] {
  const errors: string[] = [];

  if (!data.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.password) {
    errors.push('Password is required');
  } else if (data.password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // Adicione outras validações conforme necessário
  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar a senha fornecida
export async function isValidPassword(providedPassword: string, storedPasswordHash: string): Promise<boolean> {
  // Compara a senha fornecida com a senha criptografada armazenada
  return await bcrypt.compare(providedPassword, storedPasswordHash);
}

// Função para hash da senha antes de salvar no banco de dados
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}