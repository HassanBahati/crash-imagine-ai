import { Router } from 'express';
import { validate } from 'express-validation';
import { TaskController } from 'server/controllers';
import { taskValidation, options } from 'server/validations';

const router = Router();

router.get(
  '/',
  validate(taskValidation.getAll, options),
  TaskController.getAll
);

router.get('/:id', TaskController.get);

router.post(
  '/',
  validate(taskValidation.create, options),
  TaskController.create
);

router.put(
  '/:id',
  validate(taskValidation.update, options),
  TaskController.update
);

router.patch(
  '/:id',
  validate(taskValidation.partialUpdate, options),
  TaskController.partialUpdate
);

router.delete(
  '/:id',
  validate(taskValidation.destroy, options),
  TaskController.destroy
);

export { router as taskRouter };
