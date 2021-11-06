import { CREATED } from 'http-status';
import { TeamService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class TeamController {
  static async create(req, res, next) {
    try {
      const { name, members } = req.body;
      const newTeam = await TeamService.create(name, members);
      res.locals.status = CREATED;
      res.locals.data = newTeam;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const teamObject = await TeamService.get(id);
      if (!teamObject) {
        throw new NotFound(`Team with primary key ${id} not found`);
      }
      res.locals.data = teamObject;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allTeams = await TeamService.getAll(filters);
      res.locals.data = allTeams;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, members } = req.body;

      const updatedTeam = await TeamService.update(id, name, members);

      res.locals.data = updatedTeam;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { name, members } = req.body;

      const updatedTeam = await TeamService.partialUpdate(id, name, members);

      res.locals.data = updatedTeam;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const teamDelete = await TeamService.destroy(id);
      res.locals.data = teamDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { TeamController };
