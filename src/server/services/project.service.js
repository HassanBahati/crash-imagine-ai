import { ProjectRepository } from 'data/repositories';

class ProjectService {
  static create(projectName, creation, creator) {
    return ProjectRepository.create(projectName, creation, creator);
  }

  static get(projectName) {
    return ProjectRepository.get(projectName);
  }

  static getAll(args) {
    return ProjectRepository.getAll(args);
  }

  static update(projectName, creation, creator) {
    return ProjectRepository.update(projectName, creation, creator);
  }

  static partialUpdate(projectName, creation, creator) {
    return ProjectRepository.partialUpdate({ projectName, creation, creator });
  }

  static destroy(projectName) {
    return ProjectRepository.destroy(projectName);
  }
}

export { ProjectService };
