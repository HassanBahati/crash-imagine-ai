import { TaskRepository } from 'data/repositories';

class TaskService {
  static create(
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
    return TaskRepository.create(
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
  }

  static get(id) {
    return TaskRepository.get(id);
  }

  static getAll(args) {
    return TaskRepository.getAll(args);
  }

  static update(
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
    return TaskRepository.update(
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
  }

  static partialUpdate(
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
    return TaskRepository.partialUpdate({
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

  static destroy(id) {
    return TaskRepository.destroy(id);
  }
}

export { TaskService };
