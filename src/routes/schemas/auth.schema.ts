import { FastifySchema } from 'fastify';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const RegisterSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      email: z.string().email(),
      name: z.string(),
      password: z
        .string()
        .min(10, 'A senha deve conter ao menos 10 caracteres')
        .regex(/[A-Z]/, 'A senha deve conter ao menos uma letra maiúscula')
        .regex(/[0-9]/, 'A senha deve conter ao menos um número')
        .regex(
          /[^A-Za-z0-9\s]/,
          'A senha deve conter ao menos um caractere especial (não sendo espaço)'
        ),
    })
  ),
};

export const LoginSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(10, 'A senha deve conter ao menos 10 caracteres')
        .regex(/[A-Z]/, 'A senha deve conter ao menos uma letra maiúscula')
        .regex(/[0-9]/, 'A senha deve conter ao menos um número')
        .regex(
          /[^A-Za-z0-9\s]/,
          'A senha deve conter ao menos um caractere especial (não sendo espaço)'
        ),
    })
  ),
};

export const GetNameSchema: FastifySchema = {
  params: zodToJsonSchema(
    z.object({
      userId: z.number(),
    })
  ),
};

export const AlterNameSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      userId: z.number(),
      newName: z.string(),
    })
  ),
};
