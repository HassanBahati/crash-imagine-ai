import { projectValidation } from './project.validation';
import { taskValidation } from './task.validation';
import { teamValidation } from './team.validation';
import { userValidation } from './user.validation';

const options = { keyByField: true };

export {
  taskValidation,
  projectValidation,
  userValidation,
  teamValidation,
  options,
};
