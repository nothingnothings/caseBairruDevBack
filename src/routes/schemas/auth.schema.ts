import { FastifySchema } from 'fastify';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const RegisterSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string().min(10),
    })
  ),
};

export const LoginSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      email: z.string().email(),
      password: z.string(),
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
