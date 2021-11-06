import { TeamRepository } from 'data/repositories';

class TeamService {
  static create(name, members) {
    return TeamRepository.create(name, members);
  }

  static get(id) {
    return TeamRepository.get(id);
  }

  static getAll(args) {
    return TeamRepository.getAll(args);
  }

  static update(id, name, members) {
    return TeamRepository.update(id, name, members);
  }

  static partialUpdate(id, name, members) {
    return TeamRepository.partialUpdate({ id, name, members });
  }

  static destroy(id) {
    return TeamRepository.destroy(id);
  }
}

export { TeamService };
