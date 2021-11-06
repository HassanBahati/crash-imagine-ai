import request from 'supertest';
import { Project, User } from 'data/models';
import { app } from 'server/app';
import {
  buildProject,
  buildUser,
  createProject,
  createUser,
} from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/project';

describe('Project tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created project', async () => {
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);

    const fakeProject = await buildProject({ creator: relFakeCreator.id });

    const response = await request(app).post(ENDPOINT).send(fakeProject);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseProject = response.body.data;

    const project = await Project.findByPk(responseProject.projectName);

    expect(project.creation.toJSON()).toEqual(fakeProject.creation);

    expect(project.creator).toBe(fakeProject.creator);
  });

  test('/POST - creator does not exists, project cant be created', async () => {
    const fakeProject = await buildProject({});
    const creator = await User.findOne({ where: { id: fakeProject.creator } });
    await creator.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeProject);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a project', async () => {
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);

    const projectDict = await buildProject({ creator: relFakeCreator.id });
    const fakeProject = await createProject(projectDict);

    const response = await request(app).get(
      `${ENDPOINT}/${fakeProject.projectName}`
    );

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.projectName).toBe(fakeProject.projectName);
    expect(data.creation).toBe(fakeProject.creation.toJSON());

    expect(data.tasks).toEqual([]);
    expect(data.creator).toBe(fakeProject.creator);
  });
  test('/GET - Response with a project not found', async () => {
    const projectDict = await buildProject({});
    const fakeProject = await createProject(projectDict);
    const { projectName } = fakeProject;
    await fakeProject.destroy();

    const response = await request(app).get(`${ENDPOINT}/${projectName}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of projects', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allProject = await Project.findAll();
    expect(data.length).toBe(allProject.length);
  });
  test('/PUT - Response with an updated project', async () => {
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);

    const projectDict = await buildProject({ creator: relFakeCreator.id });
    const fakeProject = await createProject(projectDict);

    const anotherCreatorDict = await buildUser({});
    const anotherrelFakeCreator = await createUser(anotherCreatorDict);

    const anotherFakeProject = await buildProject({
      creator: anotherrelFakeCreator.id,
    });

    const response = await request(app)
      .put(`${ENDPOINT}/${fakeProject.projectName}`)
      .send({
        creation: anotherFakeProject.creation,
        creator: anotherFakeProject.creator,
      });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.creation).toBe(anotherFakeProject.creation);
    expect(data.creator).toBe(anotherFakeProject.creator);

    const updatedProject = await Project.findByPk(fakeProject.projectName);

    expect(updatedProject.creation.toJSON()).toEqual(
      anotherFakeProject.creation
    );

    expect(updatedProject.creator).toBe(anotherFakeProject.creator);
  });

  test('/PUT - creator does not exists, project cant be updated', async () => {
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);

    const projectDict = await buildProject({ creator: relFakeCreator.id });
    const fakeProject = await createProject(projectDict);

    const anotherCreatorDict = await buildUser({});
    const anotherrelFakeCreator = await createUser(anotherCreatorDict);

    projectDict.creator = anotherrelFakeCreator.id;

    await anotherrelFakeCreator.destroy();

    const response = await request(app)
      .put(`${ENDPOINT}/${fakeProject.projectName}`)
      .send({
        creation: projectDict.creation,
        creator: projectDict.creator,
      });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Project does not exists, project cant be updated', async () => {
    const projectDict = await buildProject({});
    const fakeProject = await createProject(projectDict);
    const { projectName } = fakeProject;
    await fakeProject.destroy();

    const response = await request(app).put(`${ENDPOINT}/${projectName}`).send({
      creation: projectDict.creation,
      creator: projectDict.creator,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated project (no updates)', async () => {
    const relCreatorDict = await buildUser({});
    const relFakeCreator = await createUser(relCreatorDict);

    const projectDict = await buildProject({ creator: relFakeCreator.id });
    const fakeProject = await createProject(projectDict);

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeProject.projectName}`)
      .send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/DELETE - Response with a deleted project', async () => {
    const projectDict = await buildProject({});
    const fakeProject = await createProject(projectDict);

    const response = await request(app).delete(
      `${ENDPOINT}/${fakeProject.projectName}`
    );

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.projectName).toBe(fakeProject.projectName);

    const deletedProject = await Project.findByPk(fakeProject.projectName);
    expect(deletedProject).toBe(null);
  });

  test('/DELETE - Project does not exists, project cant be deleted', async () => {
    const projectDict = await buildProject({});
    const fakeProject = await createProject(projectDict);
    const { projectName } = fakeProject;
    await fakeProject.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${projectName}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
