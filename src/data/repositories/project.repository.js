import { Project } from 'data/models';
import { NotFound } from 'server/utils/errors';

class ProjectRepository {
  static async create(projectName, creation, creator) {
    const createdProject = await Project.create({
      projectName,
      creation,
      creator,
    });

    return createdProject;
  }

  static get(projectName) {
    return Project.findByPk(projectName, { include: ['tasks'] });
  }

  static getAll(filters) {
    return Project.findAll({
      where: filters,
      include: ['tasks'],
    });
  }

  static async update(projectName, creation, creator) {
    return this.partialUpdate({
      projectName,
      creation,
      creator,
    });
  }

  static async partialUpdate({ projectName, creation, creator }) {
    const foundProject = await Project.findByPk(projectName);
    if (!foundProject)
      throw new NotFound(`Project with primary key ${projectName} not found`);
    if (creation !== undefined) foundProject.creation = creation;
    if (creator !== undefined) foundProject.creator = creator;
    await foundProject.save();
    return foundProject.reload();
  }

  static async destroy(projectName) {
    const foundProject = await Project.findByPk(projectName);
    if (!foundProject)
      throw new NotFound(`Project with primary key ${projectName} not found`);
    await foundProject.destroy();
    return foundProject;
  }
}

export { ProjectRepository };
