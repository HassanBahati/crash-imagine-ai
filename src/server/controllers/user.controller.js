import { CREATED } from 'http-status';
import { UserService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class UserController {
  static async create(req, res, next) {
    try {
      const { username, firstName, lastName, memberOf } = req.body;
      const newUser = await UserService.create(
        username,
        firstName,
        lastName,
        memberOf
      );
      res.locals.status = CREATED;
      res.locals.data = newUser;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const userObject = await UserService.get(id);
      if (!userObject) {
        throw new NotFound(`User with primary key ${id} not found`);
      }
      res.locals.data = userObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allUsers = await UserService.getAll(filters);
      res.locals.data = allUsers;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { username, firstName, lastName, memberOf } = req.body;

      const updatedUser = await UserService.update(
        id,
        username,
        firstName,
        lastName,
        memberOf
      );

      res.locals.data = updatedUser;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { username, firstName, lastName, memberOf } = req.body;

      const updatedUser = await UserService.partialUpdate(
        id,
        username,
        firstName,
        lastName,
        memberOf
      );

      res.locals.data = updatedUser;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const userDelete = await UserService.destroy(id);
      res.locals.data = userDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { UserController };
