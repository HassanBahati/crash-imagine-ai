import request from 'supertest';
import { Task, Project, User } from 'data/models';
import { app } from 'server/app';
import {
  buildTask,
  buildProject,
  buildUser,
  createTask,
  createProject,
  createUser,
} from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/task';

describe('Task tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created task', async () => {
    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);
    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const fakeTask = await buildTask({
      project: relFakeProject.projectName,
      creator: relFakeCreator.id,
      assignedPrimary: relFakeAssignedPrimary.id,
      assignedSecondary: relFakeAssignedSecondary.id,
      parentTask: relFakeParentTask.id,
    });

    const response = await request(app).post(ENDPOINT).send(fakeTask);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseTask = response.body.data;

    const task = await Task.findByPk(responseTask.id);

    expect(task.title).toBe(fakeTask.title);
    expect(task.body).toBe(fakeTask.body);
    expect(task.dueDate).toBe(fakeTask.dueDate);
    expect(task.status).toBe(fakeTask.status);
    expect(task.creation.toJSON()).toEqual(fakeTask.creation);
    expect(task.priority).toBe(fakeTask.priority);
    expect(task.storyPoint).toBe(fakeTask.storyPoint);

    expect(task.project).toBe(fakeTask.project);
    expect(task.creator).toBe(fakeTask.creator);
    expect(task.assignedPrimary).toBe(fakeTask.assignedPrimary);
    expect(task.assignedSecondary).toBe(fakeTask.assignedSecondary);
    expect(task.parentTask).toBe(fakeTask.parentTask);
  });

  test('/POST - project does not exists, task cant be created', async () => {
    const fakeTask = await buildTask({});
    const project = await Project.findOne({
      where: { projectName: fakeTask.project },
    });
    await project.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeTask);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/POST - creator does not exists, task cant be created', async () => {
    const fakeTask = await buildTask({});
    const creator = await User.findOne({ where: { id: fakeTask.creator } });
    await creator.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeTask);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/POST - assignedPrimary does not exists, task cant be created', async () => {
    const fakeTask = await buildTask({});
    const assignedPrimary = await User.findOne({
      where: { id: fakeTask.assignedPrimary },
    });
    await assignedPrimary.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeTask);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/POST - assignedSecondary does not exists, task cant be created', async () => {
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);

    const { id } = relFakeAssignedSecondary;
    await relFakeAssignedSecondary.destroy();

    const fakeTask = await buildTask({ assignedSecondary: id });

    const response = await request(app).post(ENDPOINT).send(fakeTask);

    expect(response.statusCode).toBe(404);
  });

  test('/POST - parentTask does not exists, task cant be created', async () => {
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const { id } = relFakeParentTask;
    await relFakeParentTask.destroy();

    const fakeTask = await buildTask({ parentTask: id });

    const response = await request(app).post(ENDPOINT).send(fakeTask);

    expect(response.statusCode).toBe(404);
  });

  test('/GET - Response with a task', async () => {
    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);
    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const taskDict = await buildTask({
      project: relFakeProject.projectName,
      creator: relFakeCreator.id,
      assignedPrimary: relFakeAssignedPrimary.id,
      assignedSecondary: relFakeAssignedSecondary.id,
      parentTask: relFakeParentTask.id,
    });
    const fakeTask = await createTask(taskDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeTask.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeTask.id);
    expect(data.title).toBe(fakeTask.title);
    expect(data.body).toBe(fakeTask.body);
    expect(data.dueDate).toBe(fakeTask.dueDate);
    expect(data.status).toBe(fakeTask.status);
    expect(data.creation).toBe(fakeTask.creation.toJSON());
    expect(data.priority).toBe(fakeTask.priority);
    expect(data.storyPoint).toBe(fakeTask.storyPoint);

    expect(data.subtasks).toEqual([]);
    expect(data.project).toBe(fakeTask.project);
    expect(data.creator).toBe(fakeTask.creator);
    expect(data.assignedPrimary).toBe(fakeTask.assignedPrimary);
    expect(data.assignedSecondary).toBe(fakeTask.assignedSecondary);
    expect(data.parentTask).toBe(fakeTask.parentTask);
  });
  test('/GET - Response with a task not found', async () => {
    const taskDict = await buildTask({});
    const fakeTask = await createTask(taskDict);
    const { id } = fakeTask;
    await fakeTask.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of tasks', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allTask = await Task.findAll();
    expect(data.length).toBe(allTask.length);
  });
  test('/PUT - Response with an updated task', async () => {
    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);
    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const taskDict = await buildTask({
      project: relFakeProject.projectName,
      creator: relFakeCreator.id,
      assignedPrimary: relFakeAssignedPrimary.id,
      assignedSecondary: relFakeAssignedSecondary.id,
      parentTask: relFakeParentTask.id,
    });
    const fakeTask = await createTask(taskDict);

    const anotherProjectDict = await buildProject({});
    const anotherrelFakeProject = await createProject(anotherProjectDict);
    const anotherCreatorDict = await buildUser({});
    const anotherrelFakeCreator = await createUser(anotherCreatorDict);
    const anotherAssignedPrimaryDict = await buildUser({});
    const anotherrelFakeAssignedPrimary = await createUser(
      anotherAssignedPrimaryDict
    );
    const anotherAssignedSecondaryDict = await buildUser({});
    const anotherrelFakeAssignedSecondary = await createUser(
      anotherAssignedSecondaryDict
    );
    const anotherParentTaskDict = await buildTask({});
    const anotherrelFakeParentTask = await createTask(anotherParentTaskDict);

    const anotherFakeTask = await buildTask({
      project: anotherrelFakeProject.projectName,
      creator: anotherrelFakeCreator.id,
      assignedPrimary: anotherrelFakeAssignedPrimary.id,
      assignedSecondary: anotherrelFakeAssignedSecondary.id,
      parentTask: anotherrelFakeParentTask.id,
    });

    const response = await request(app).put(`${ENDPOINT}/${fakeTask.id}`).send({
      title: anotherFakeTask.title,
      body: anotherFakeTask.body,
      dueDate: anotherFakeTask.dueDate,
      status: anotherFakeTask.status,
      creation: anotherFakeTask.creation,
      priority: anotherFakeTask.priority,
      storyPoint: anotherFakeTask.storyPoint,
      project: anotherFakeTask.project,
      creator: anotherFakeTask.creator,
      assignedPrimary: anotherFakeTask.assignedPrimary,
      assignedSecondary: anotherFakeTask.assignedSecondary,
      parentTask: anotherFakeTask.parentTask,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.title).toBe(anotherFakeTask.title);
    expect(data.body).toBe(anotherFakeTask.body);
    expect(data.dueDate).toBe(anotherFakeTask.dueDate);
    expect(data.status).toBe(anotherFakeTask.status);
    expect(data.creation).toBe(anotherFakeTask.creation);
    expect(data.priority).toBe(anotherFakeTask.priority);
    expect(data.storyPoint).toBe(anotherFakeTask.storyPoint);
    expect(data.project).toBe(anotherFakeTask.project);
    expect(data.creator).toBe(anotherFakeTask.creator);
    expect(data.assignedPrimary).toBe(anotherFakeTask.assignedPrimary);
    expect(data.assignedSecondary).toBe(anotherFakeTask.assignedSecondary);
    expect(data.parentTask).toBe(anotherFakeTask.parentTask);

    const updatedTask = await Task.findByPk(fakeTask.id);

    expect(updatedTask.title).toBe(anotherFakeTask.title);
    expect(updatedTask.body).toBe(anotherFakeTask.body);
    expect(updatedTask.dueDate).toBe(anotherFakeTask.dueDate);
    expect(updatedTask.status).toBe(anotherFakeTask.status);
    expect(updatedTask.creation.toJSON()).toEqual(anotherFakeTask.creation);
    expect(updatedTask.priority).toBe(anotherFakeTask.priority);
    expect(updatedTask.storyPoint).toBe(anotherFakeTask.storyPoint);

    expect(updatedTask.project).toBe(anotherFakeTask.project);
    expect(updatedTask.creator).toBe(anotherFakeTask.creator);
    expect(updatedTask.assignedPrimary).toBe(anotherFakeTask.assignedPrimary);
    expect(updatedTask.assignedSecondary).toBe(
      anotherFakeTask.assignedSecondary
    );
    expect(updatedTask.parentTask).toBe(anotherFakeTask.parentTask);
  });

  test('/PUT - project does not exists, task cant be updated', async () => {
    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);
    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const taskDict = await buildTask({
      project: relFakeProject.projectName,
      creator: relFakeCreator.id,
      assignedPrimary: relFakeAssignedPrimary.id,
      assignedSecondary: relFakeAssignedSecondary.id,
      parentTask: relFakeParentTask.id,
    });
    const fakeTask = await createTask(taskDict);

    const anotherProjectDict = await buildProject({});
    const anotherrelFakeProject = await createProject(anotherProjectDict);

    taskDict.project = anotherrelFakeProject.projectName;

    await anotherrelFakeProject.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeTask.id}`).send({
      title: taskDict.title,
      body: taskDict.body,
      dueDate: taskDict.dueDate,
      status: taskDict.status,
      creation: taskDict.creation,
      priority: taskDict.priority,
      storyPoint: taskDict.storyPoint,
      project: taskDict.project,
      creator: taskDict.creator,
      assignedPrimary: taskDict.assignedPrimary,
      assignedSecondary: taskDict.assignedSecondary,
      parentTask: taskDict.parentTask,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PUT - creator does not exists, task cant be updated', async () => {
    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);
    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const taskDict = await buildTask({
      project: relFakeProject.projectName,
      creator: relFakeCreator.id,
      assignedPrimary: relFakeAssignedPrimary.id,
      assignedSecondary: relFakeAssignedSecondary.id,
      parentTask: relFakeParentTask.id,
    });
    const fakeTask = await createTask(taskDict);

    const anotherCreatorDict = await buildUser({});
    const anotherrelFakeCreator = await createUser(anotherCreatorDict);

    taskDict.creator = anotherrelFakeCreator.id;

    await anotherrelFakeCreator.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeTask.id}`).send({
      title: taskDict.title,
      body: taskDict.body,
      dueDate: taskDict.dueDate,
      status: taskDict.status,
      creation: taskDict.creation,
      priority: taskDict.priority,
      storyPoint: taskDict.storyPoint,
      project: taskDict.project,
      creator: taskDict.creator,
      assignedPrimary: taskDict.assignedPrimary,
      assignedSecondary: taskDict.assignedSecondary,
      parentTask: taskDict.parentTask,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PUT - assignedPrimary does not exists, task cant be updated', async () => {
    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);
    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const taskDict = await buildTask({
      project: relFakeProject.projectName,
      creator: relFakeCreator.id,
      assignedPrimary: relFakeAssignedPrimary.id,
      assignedSecondary: relFakeAssignedSecondary.id,
      parentTask: relFakeParentTask.id,
    });
    const fakeTask = await createTask(taskDict);

    const anotherAssignedPrimaryDict = await buildUser({});
    const anotherrelFakeAssignedPrimary = await createUser(
      anotherAssignedPrimaryDict
    );

    taskDict.assignedPrimary = anotherrelFakeAssignedPrimary.id;

    await anotherrelFakeAssignedPrimary.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeTask.id}`).send({
      title: taskDict.title,
      body: taskDict.body,
      dueDate: taskDict.dueDate,
      status: taskDict.status,
      creation: taskDict.creation,
      priority: taskDict.priority,
      storyPoint: taskDict.storyPoint,
      project: taskDict.project,
      creator: taskDict.creator,
      assignedPrimary: taskDict.assignedPrimary,
      assignedSecondary: taskDict.assignedSecondary,
      parentTask: taskDict.parentTask,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PUT - assignedSecondary does not exists, task cant be updated', async () => {
    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);
    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const taskDict = await buildTask({
      project: relFakeProject.projectName,
      creator: relFakeCreator.id,
      assignedPrimary: relFakeAssignedPrimary.id,
      assignedSecondary: relFakeAssignedSecondary.id,
      parentTask: relFakeParentTask.id,
    });
    const fakeTask = await createTask(taskDict);

    const anotherAssignedSecondaryDict = await buildUser({});
    const anotherrelFakeAssignedSecondary = await createUser(
      anotherAssignedSecondaryDict
    );

    taskDict.assignedSecondary = anotherrelFakeAssignedSecondary.id;

    await anotherrelFakeAssignedSecondary.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeTask.id}`).send({
      title: taskDict.title,
      body: taskDict.body,
      dueDate: taskDict.dueDate,
      status: taskDict.status,
      creation: taskDict.creation,
      priority: taskDict.priority,
      storyPoint: taskDict.storyPoint,
      project: taskDict.project,
      creator: taskDict.creator,
      assignedPrimary: taskDict.assignedPrimary,
      assignedSecondary: taskDict.assignedSecondary,
      parentTask: taskDict.parentTask,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PUT - parentTask does not exists, task cant be updated', async () => {
    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);
    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const taskDict = await buildTask({
      project: relFakeProject.projectName,
      creator: relFakeCreator.id,
      assignedPrimary: relFakeAssignedPrimary.id,
      assignedSecondary: relFakeAssignedSecondary.id,
      parentTask: relFakeParentTask.id,
    });
    const fakeTask = await createTask(taskDict);

    const anotherParentTaskDict = await buildTask({});
    const anotherrelFakeParentTask = await createTask(anotherParentTaskDict);

    taskDict.parentTask = anotherrelFakeParentTask.id;

    await anotherrelFakeParentTask.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeTask.id}`).send({
      title: taskDict.title,
      body: taskDict.body,
      dueDate: taskDict.dueDate,
      status: taskDict.status,
      creation: taskDict.creation,
      priority: taskDict.priority,
      storyPoint: taskDict.storyPoint,
      project: taskDict.project,
      creator: taskDict.creator,
      assignedPrimary: taskDict.assignedPrimary,
      assignedSecondary: taskDict.assignedSecondary,
      parentTask: taskDict.parentTask,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Task does not exists, task cant be updated', async () => {
    const taskDict = await buildTask({});
    const fakeTask = await createTask(taskDict);
    const { id } = fakeTask;
    await fakeTask.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      title: taskDict.title,
      body: taskDict.body,
      dueDate: taskDict.dueDate,
      status: taskDict.status,
      creation: taskDict.creation,
      priority: taskDict.priority,
      storyPoint: taskDict.storyPoint,
      project: taskDict.project,
      creator: taskDict.creator,
      assignedPrimary: taskDict.assignedPrimary,
      assignedSecondary: taskDict.assignedSecondary,
      parentTask: taskDict.parentTask,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated task (no updates)', async () => {
    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);
    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const taskDict = await buildTask({
      project: relFakeProject.projectName,
      creator: relFakeCreator.id,
      assignedPrimary: relFakeAssignedPrimary.id,
      assignedSecondary: relFakeAssignedSecondary.id,
      parentTask: relFakeParentTask.id,
    });
    const fakeTask = await createTask(taskDict);

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTask.id}`)
      .send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated task', async () => {
    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);
    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);
    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);
    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const taskDict = await buildTask({
      project: relFakeProject.projectName,
      creator: relFakeCreator.id,
      assignedPrimary: relFakeAssignedPrimary.id,
      assignedSecondary: relFakeAssignedSecondary.id,
      parentTask: relFakeParentTask.id,
    });
    const fakeTask = await createTask(taskDict);

    const anotherProjectDict = await buildProject({});
    const anotherrelFakeProject = await createProject(anotherProjectDict);
    const anotherCreatorDict = await buildUser({});
    const anotherrelFakeCreator = await createUser(anotherCreatorDict);
    const anotherAssignedPrimaryDict = await buildUser({});
    const anotherrelFakeAssignedPrimary = await createUser(
      anotherAssignedPrimaryDict
    );
    const anotherAssignedSecondaryDict = await buildUser({});
    const anotherrelFakeAssignedSecondary = await createUser(
      anotherAssignedSecondaryDict
    );
    const anotherParentTaskDict = await buildTask({});
    const anotherrelFakeParentTask = await createTask(anotherParentTaskDict);

    const anotherFakeTask = await buildTask({
      project: anotherrelFakeProject.projectName,
      creator: anotherrelFakeCreator.id,
      assignedPrimary: anotherrelFakeAssignedPrimary.id,
      assignedSecondary: anotherrelFakeAssignedSecondary.id,
      parentTask: anotherrelFakeParentTask.id,
    });

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTask.id}`)
      .send({ title: anotherFakeTask.title });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.title).toBe(anotherFakeTask.title);

    const updatedTask = await Task.findByPk(fakeTask.id);

    expect(updatedTask.title).toBe(anotherFakeTask.title);
  });

  test('/PATCH - project does not exists, task cant be updated', async () => {
    const taskDict = await buildTask({});
    const fakeTask = await createTask(taskDict);

    const relProjectDict = await buildProject({});
    const relFakeProject = await createProject(relProjectDict);

    const relFakeProjectProjectName = relFakeProject.projectName;
    await relFakeProject.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTask.id}`)
      .send({
        project: relFakeProjectProjectName,
      });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - creator does not exists, task cant be updated', async () => {
    const taskDict = await buildTask({});
    const fakeTask = await createTask(taskDict);

    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);

    const relFakeCreatorId = relFakeCreator.id;
    await relFakeCreator.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTask.id}`)
      .send({
        creator: relFakeCreatorId,
      });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - assignedPrimary does not exists, task cant be updated', async () => {
    const taskDict = await buildTask({});
    const fakeTask = await createTask(taskDict);

    const relAssignedPrimaryDict = await buildUser({});
    const relFakeAssignedPrimary = await createUser(relAssignedPrimaryDict);

    const relFakeAssignedPrimaryId = relFakeAssignedPrimary.id;
    await relFakeAssignedPrimary.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTask.id}`)
      .send({
        assignedPrimary: relFakeAssignedPrimaryId,
      });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - assignedSecondary does not exists, task cant be updated', async () => {
    const taskDict = await buildTask({});
    const fakeTask = await createTask(taskDict);

    const relAssignedSecondaryDict = await buildUser({});
    const relFakeAssignedSecondary = await createUser(relAssignedSecondaryDict);

    const relFakeAssignedSecondaryId = relFakeAssignedSecondary.id;
    await relFakeAssignedSecondary.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTask.id}`)
      .send({
        assignedSecondary: relFakeAssignedSecondaryId,
      });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - parentTask does not exists, task cant be updated', async () => {
    const taskDict = await buildTask({});
    const fakeTask = await createTask(taskDict);

    const relParentTaskDict = await buildTask({});
    const relFakeParentTask = await createTask(relParentTaskDict);

    const relFakeParentTaskId = relFakeParentTask.id;
    await relFakeParentTask.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTask.id}`)
      .send({
        parentTask: relFakeParentTaskId,
      });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Task does not exists, task cant be updated', async () => {
    const taskDict = await buildTask({});
    const fakeTask = await createTask(taskDict);
    const { id } = fakeTask;
    const { title } = fakeTask;
    await fakeTask.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${id}`)
      .send({ title });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted task', async () => {
    const taskDict = await buildTask({});
    const fakeTask = await createTask(taskDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeTask.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeTask.id);

    const deletedTask = await Task.findByPk(fakeTask.id);
    expect(deletedTask).toBe(null);
  });

  test('/DELETE - Task does not exists, task cant be deleted', async () => {
    const taskDict = await buildTask({});
    const fakeTask = await createTask(taskDict);
    const { id } = fakeTask;
    await fakeTask.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
