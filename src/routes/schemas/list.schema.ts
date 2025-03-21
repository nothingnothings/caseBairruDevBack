import { FastifySchema } from 'fastify';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const CreateListSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      userId: z.number().min(1),
      label: z.string(),
    })
  ),
};

export const UpdateListSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      id: z.number().min(1),
      label: z.string(),
    })
  ),
};

export const DeleteListSchema: FastifySchema = {
  params: zodToJsonSchema(
    z.object({
      listId: z.number().min(1),
    })
  ),
};

export const FindListsSchema: FastifySchema = {
  params: zodToJsonSchema(
    z.object({
      userId: z.number().min(1),
    })
  ),
};

export const FinishListSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      id: z.number().min(1),
      finishedAt: z.date().nullable() // poderemos enviar ou dates ou null.
    })
  ),
};
