import { Joi } from 'express-validation';
import { taskStatusChoices } from 'server/utils/constants/fieldChoices';

const taskValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.string().uuid({ version: ['uuidv4'] }),
      title: Joi.string().max(20),
      body: Joi.string().max(1000),
      dueDate: Joi.date(),
      status: Joi.string().valid(...taskStatusChoices),
      creation: Joi.date(),
      priority: Joi.number().integer().min(1).max(5),
      storyPoint: Joi.number(),
    }),
  },
  create: {
    body: Joi.object({
      project: Joi.string().max(30).required(),
      creator: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
      assignedPrimary: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
      assignedSecondary: Joi.string().uuid({ version: ['uuidv4'] }),
      parentTask: Joi.string().uuid({ version: ['uuidv4'] }),
      title: Joi.string().max(20).required(),
      body: Joi.string().max(1000),
      dueDate: Joi.date(),
      status: Joi.string()
        .valid(...taskStatusChoices)
        .required(),
      creation: Joi.date(),
      priority: Joi.number().integer().min(1).max(5),
      storyPoint: Joi.number(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      title: Joi.string().max(20).required(),
      body: Joi.string().max(1000).required(),
      dueDate: Joi.date().required(),
      status: Joi.string()
        .valid(...taskStatusChoices)
        .required(),
      creation: Joi.date().required(),
      priority: Joi.number().integer().min(1).max(5).required(),
      storyPoint: Joi.number().required(),
      project: Joi.string().max(30).required(),
      creator: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
      assignedPrimary: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
      assignedSecondary: Joi.string().uuid({ version: ['uuidv4'] }),
      parentTask: Joi.string().uuid({ version: ['uuidv4'] }),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      title: Joi.string().max(20),
      body: Joi.string().max(1000),
      dueDate: Joi.date(),
      status: Joi.string().valid(...taskStatusChoices),
      creation: Joi.date(),
      priority: Joi.number().integer().min(1).max(5),
      storyPoint: Joi.number(),
      project: Joi.string().max(30),
      creator: Joi.string().uuid({ version: ['uuidv4'] }),
      assignedPrimary: Joi.string().uuid({ version: ['uuidv4'] }),
      assignedSecondary: Joi.string().uuid({ version: ['uuidv4'] }),
      parentTask: Joi.string().uuid({ version: ['uuidv4'] }),
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

export { taskValidation };
