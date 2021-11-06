import { Joi } from 'express-validation';

const teamValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.string().uuid({ version: ['uuidv4'] }),
      name: Joi.string().max(80),
    }),
  },
  create: {
    body: Joi.object({
      name: Joi.string().max(80).required(),
      members: Joi.array()
        .items(Joi.string().uuid({ version: ['uuidv4'] }))
        .default([]),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      name: Joi.string().max(80).required(),
      members: Joi.array()
        .items(Joi.string().uuid({ version: ['uuidv4'] }))
        .default([]),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      name: Joi.string().max(80),
      members: Joi.array()
        .items(Joi.string().uuid({ version: ['uuidv4'] }))
        .default([]),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
  },
};

export { teamValidation };
