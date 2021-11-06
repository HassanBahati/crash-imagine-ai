import { CREATED } from 'http-status';
import { TaskService, ProjectService, UserService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class TaskController {
  static async create(req, res, next) {
    try {
      const {
        title,
        body,
        dueDate,
        status,
        creation,
        priority,
        storyPoint,
        project,
        creator,
        assignedPrimary,
        assignedSecondary,
        parentTask,
      } = req.body;
      if (project !== null && typeof project !== 'undefined') {
        const dbproject = await ProjectService.get(project);
        if (!dbproject) {
          throw new NotFound(`Project ${project} not found`);
        }
      }
      if (creator !== null && typeof creator !== 'undefined') {
        const dbcreator = await UserService.get(creator);
        if (!dbcreator) {
          throw new NotFound(`User ${creator} not found`);
        }
      }
      if (assignedPrimary !== null && typeof assignedPrimary !== 'undefined') {
        const dbassignedPrimary = await UserService.get(assignedPrimary);
        if (!dbassignedPrimary) {
          throw new NotFound(`User ${assignedPrimary} not found`);
        }
      }
      if (
        assignedSecondary !== null &&
        typeof assignedSecondary !== 'undefined'
      ) {
        const dbassignedSecondary = await UserService.get(assignedSecondary);
        if (!dbassignedSecondary) {
          throw new NotFound(`User ${assignedSecondary} not found`);
        }
      }
      if (parentTask !== null && typeof parentTask !== 'undefined') {
        const dbparentTask = await TaskService.get(parentTask);
        if (!dbparentTask) {
          throw new NotFound(`Task ${parentTask} not found`);
        }
      }
      const newTask = await TaskService.create(
        title,
        body,
        dueDate,
        status,
        creation,
        priority,
        storyPoint,
        project,
        creator,
        assignedPrimary,
        assignedSecondary,
        parentTask
      );
      res.locals.status = CREATED;
      res.locals.data = newTask;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const taskObject = await TaskService.get(id);
      if (!taskObject) {
        throw new NotFound(`Task with primary key ${id} not found`);
      }
      res.locals.data = taskObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allTasks = await TaskService.getAll(filters);
      res.locals.data = allTasks;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        title,
        body,
        dueDate,
        status,
        creation,
        priority,
        storyPoint,
        project,
        creator,
        assignedPrimary,
        assignedSecondary,
        parentTask,
      } = req.body;
      if (project !== null && typeof project !== 'undefined') {
        if (!(await ProjectService.get(project))) {
          throw new NotFound(`Project ${project} not found`);
        }
      }
      if (creator !== null && typeof creator !== 'undefined') {
        if (!(await UserService.get(creator))) {
          throw new NotFound(`User ${creator} not found`);
        }
      }
      if (assignedPrimary !== null && typeof assignedPrimary !== 'undefined') {
        if (!(await UserService.get(assignedPrimary))) {
          throw new NotFound(`User ${assignedPrimary} not found`);
        }
      }
      if (
        assignedSecondary !== null &&
        typeof assignedSecondary !== 'undefined'
      ) {
        if (!(await UserService.get(assignedSecondary))) {
          throw new NotFound(`User ${assignedSecondary} not found`);
        }
      }
      if (parentTask !== null && typeof parentTask !== 'undefined') {
        if (!(await TaskService.get(parentTask))) {
          throw new NotFound(`Task ${parentTask} not found`);
        }
      }

      const updatedTask = await TaskService.update(
        id,
        title,
        body,
        dueDate,
        status,
        creation,
        priority,
        storyPoint,
        project,
        creator,
        assignedPrimary,
        assignedSecondary,
        parentTask
      );

      res.locals.data = updatedTask;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const {
        title,
        body,
        dueDate,
        status,
        creation,
        priority,
        storyPoint,
        project,
        creator,
        assignedPrimary,
        assignedSecondary,
        parentTask,
      } = req.body;
      if (project !== null && typeof project !== 'undefined') {
        if (!(await ProjectService.get(project))) {
          throw new NotFound(`Project ${project} not found`);
        }
      }
      if (creator !== null && typeof creator !== 'undefined') {
        if (!(await UserService.get(creator))) {
          throw new NotFound(`User ${creator} not found`);
        }
      }
      if (assignedPrimary !== null && typeof assignedPrimary !== 'undefined') {
        if (!(await UserService.get(assignedPrimary))) {
          throw new NotFound(`User ${assignedPrimary} not found`);
        }
      }
      if (
        assignedSecondary !== null &&
        typeof assignedSecondary !== 'undefined'
      ) {
        if (!(await UserService.get(assignedSecondary))) {
          throw new NotFound(`User ${assignedSecondary} not found`);
        }
      }
      if (parentTask !== null && typeof parentTask !== 'undefined') {
        if (!(await TaskService.get(parentTask))) {
          throw new NotFound(`Task ${parentTask} not found`);
        }
      }

      const updatedTask = await TaskService.partialUpdate(
        id,
        title,
        body,
        dueDate,
        status,
        creation,
        priority,
        storyPoint,
        project,
        creator,
        assignedPrimary,
        assignedSecondary,
        parentTask
      );

      res.locals.data = updatedTask;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const taskDelete = await TaskService.destroy(id);
      res.locals.data = taskDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { TaskController };
