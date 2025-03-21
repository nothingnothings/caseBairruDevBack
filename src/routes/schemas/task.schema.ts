import { FastifySchema } from 'fastify';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const CreateTaskSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      listId: z.number().min(1),
      label: z.string(),
    })
  ),
};

export const UpdateTaskSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      id: z.number().min(1),
      label: z.string(),
    })
  ),
};

export const DeleteTaskSchema: FastifySchema = {
  params: zodToJsonSchema(
    z.object({
      taskId: z.number().min(1),
    })
  ),
};

export const FindTasksSchema: FastifySchema = {
  params: zodToJsonSchema(
    z.object({
      listId: z.number().min(1),
    })
  ),
};

export const FinishTaskSchema: FastifySchema = {
  body: zodToJsonSchema(
    z.object({
      id: z.number().min(1),
      finishedAt: z.date().nullable(), // poderemos enviar ou dates ou null.
    })
  ),
};
