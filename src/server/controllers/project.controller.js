import { CREATED } from 'http-status';
import { ProjectService, UserService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class ProjectController {
  static async create(req, res, next) {
    try {
      const { projectName, creation, creator } = req.body;
      if (creator !== null && typeof creator !== 'undefined') {
        const dbcreator = await UserService.get(creator);
        if (!dbcreator) {
          throw new NotFound(`User ${creator} not found`);
        }
      }
      const newProject = await ProjectService.create(
        projectName,
        creation,
        creator
      );
      res.locals.status = CREATED;
      res.locals.data = newProject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { projectName } = req.params;
      const projectObject = await ProjectService.get(projectName);
      if (!projectObject) {
        throw new NotFound(`Project with primary key ${projectName} not found`);
      }
      res.locals.data = projectObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allProjects = await ProjectService.getAll(filters);
      res.locals.data = allProjects;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { projectName } = req.params;
      const { creation, creator } = req.body;
      if (creator !== null && typeof creator !== 'undefined') {
        if (!(await UserService.get(creator))) {
          throw new NotFound(`User ${creator} not found`);
        }
      }

      const updatedProject = await ProjectService.update(
        projectName,
        creation,
        creator
      );

      res.locals.data = updatedProject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { projectName } = req.params;
      const { creation, creator } = req.body;
      if (creator !== null && typeof creator !== 'undefined') {
        if (!(await UserService.get(creator))) {
          throw new NotFound(`User ${creator} not found`);
        }
      }

      const updatedProject = await ProjectService.partialUpdate(
        projectName,
        creation,
        creator
      );

      res.locals.data = updatedProject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { projectName } = req.params;
      const projectDelete = await ProjectService.destroy(projectName);
      res.locals.data = projectDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { ProjectController };
