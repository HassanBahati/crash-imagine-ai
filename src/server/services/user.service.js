import { UserRepository } from 'data/repositories';

class UserService {
  static create(username, firstName, lastName, memberOf) {
    return UserRepository.create(username, firstName, lastName, memberOf);
  }

  static get(id) {
    return UserRepository.get(id);
  }

  static getAll(args) {
    return UserRepository.getAll(args);
  }

  static update(id, username, firstName, lastName, memberOf) {
    return UserRepository.update(id, username, firstName, lastName, memberOf);
  }

  static partialUpdate(id, username, firstName, lastName, memberOf) {
    return UserRepository.partialUpdate({
      id,
      username,
      firstName,
      lastName,
      memberOf,
    });
  }

  static destroy(id) {
    return UserRepository.destroy(id);
  }
}

export { UserService };
