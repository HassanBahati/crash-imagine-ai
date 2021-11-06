import { Router } from 'express';
import { validate } from 'express-validation';
import { TeamController } from 'server/controllers';
import { teamValidation, options } from 'server/validations';

const router = Router();

router.get(
  '/',
  validate(teamValidation.getAll, options),
  TeamController.getAll
);

router.get('/:id', TeamController.get);

router.post(
  '/',
  validate(teamValidation.create, options),
  TeamController.create
);

router.put(
  '/:id',
  validate(teamValidation.update, options),
  TeamController.update
);

router.patch(
  '/:id',
  validate(teamValidation.partialUpdate, options),
  TeamController.partialUpdate
);

router.delete(
  '/:id',
  validate(teamValidation.destroy, options),
  TeamController.destroy
);

export { router as teamRouter };
