import { Task } from 'data/models';
import { NotFound } from 'server/utils/errors';

class TaskRepository {
  static async create(
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
  ) {
    const createdTask = await Task.create({
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
    });

    return createdTask;
  }

  static get(id) {
    return Task.findByPk(id, { include: ['subtasks'] });
  }

  static getAll(filters) {
    return Task.findAll({
      where: filters,
      include: ['subtasks'],
    });
  }

  static async update(
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
  ) {
    return this.partialUpdate({
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
      parentTask,
    });
  }

  static async partialUpdate({
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
    parentTask,
  }) {
    const foundTask = await Task.findByPk(id);
    if (!foundTask) throw new NotFound(`Task with primary key ${id} not found`);
    if (title !== undefined) foundTask.title = title;
    if (body !== undefined) foundTask.body = body;
    if (dueDate !== undefined) foundTask.dueDate = dueDate;
    if (status !== undefined) foundTask.status = status;
    if (creation !== undefined) foundTask.creation = creation;
    if (priority !== undefined) foundTask.priority = priority;
    if (storyPoint !== undefined) foundTask.storyPoint = storyPoint;
    if (project !== undefined) foundTask.project = project;
    if (creator !== undefined) foundTask.creator = creator;
    if (assignedPrimary !== undefined)
      foundTask.assignedPrimary = assignedPrimary;
    if (assignedSecondary !== undefined)
      foundTask.assignedSecondary = assignedSecondary;
    if (parentTask !== undefined) foundTask.parentTask = parentTask;
    await foundTask.save();
    return foundTask.reload();
  }

  static async destroy(id) {
    const foundTask = await Task.findByPk(id);
    if (!foundTask) throw new NotFound(`Task with primary key ${id} not found`);
    await foundTask.destroy();
    return foundTask;
  }
}

export { TaskRepository };
