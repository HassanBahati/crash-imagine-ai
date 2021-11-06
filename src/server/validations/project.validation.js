import { Joi } from 'express-validation';

const projectValidation = {
  getAll: {
    query: Joi.object({
      projectName: Joi.string().max(30),
      creation: Joi.date(),
    }),
  },
  create: {
    body: Joi.object({
      projectName: Joi.string().max(30).required(),
      creator: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
      creation: Joi.date(),
    }),
  },
  update: {
    params: Joi.object({
      projectName: Joi.string().max(30).required(),
    }),
    body: Joi.object({
      creation: Joi.date().required(),
      creator: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      projectName: Joi.string().max(30).required(),
    }),
    body: Joi.object({
      creation: Joi.date(),
      creator: Joi.string().uuid({ version: ['uuidv4'] }),
    }),
  },
  destroy: {
    params: Joi.object({
      projectName: Joi.string().max(30).required(),
    }),
  },
};

export { projectValidation };
