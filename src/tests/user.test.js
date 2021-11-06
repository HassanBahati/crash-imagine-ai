import request from 'supertest';
import { User } from 'data/models';
import { app } from 'server/app';
import { buildUser, buildTeam, createUser, createTeam } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/user';

describe('User tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created user', async () => {
    const fakeUser = await buildUser({});

    const response = await request(app).post(ENDPOINT).send(fakeUser);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseUser = response.body.data;

    const user = await User.findByPk(responseUser.id);

    expect(user.username).toBe(fakeUser.username);
    expect(user.firstName).toBe(fakeUser.firstName);
    expect(user.lastName).toBe(fakeUser.lastName);
  });

  test('/POST - Response with a new created user with many to many related models', async () => {
    const memberOfDict = await buildTeam({});
    const fakeMemberOf = await createTeam(memberOfDict);

    const fakeUser = await buildUser({ memberOf: [fakeMemberOf.id] });

    const response = await request(app).post(ENDPOINT).send(fakeUser);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseUser = response.body.data;

    const user = await User.findByPk(responseUser.id, {
      include: ['memberOf'],
    });

    expect(user.memberOf[0].id).toBe(fakeMemberOf.id);
    expect(user.memberOf.length).toBe(1);
  });

  test('/GET - Response with a user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeUser.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeUser.id);
    expect(data.username).toBe(fakeUser.username);
    expect(data.firstName).toBe(fakeUser.firstName);
    expect(data.lastName).toBe(fakeUser.lastName);

    expect(data.createdTasks).toEqual([]);
    expect(data.assignedTasksPrimary).toEqual([]);
    expect(data.assignedTasksSecondary).toEqual([]);
    expect(data.createdProjects).toEqual([]);
  });
  test('/GET - Response with a user not found', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { id } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of users', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allUser = await User.findAll();
    expect(data.length).toBe(allUser.length);
  });
  test('/PUT - Response with an updated user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const anotherFakeUser = await buildUser({});

    const response = await request(app).put(`${ENDPOINT}/${fakeUser.id}`).send({
      username: anotherFakeUser.username,
      firstName: anotherFakeUser.firstName,
      lastName: anotherFakeUser.lastName,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.username).toBe(anotherFakeUser.username);
    expect(data.firstName).toBe(anotherFakeUser.firstName);
    expect(data.lastName).toBe(anotherFakeUser.lastName);

    const updatedUser = await User.findByPk(fakeUser.id);

    expect(updatedUser.username).toBe(anotherFakeUser.username);
    expect(updatedUser.firstName).toBe(anotherFakeUser.firstName);
    expect(updatedUser.lastName).toBe(anotherFakeUser.lastName);
  });

  test('/PUT - User does not exists, user cant be updated', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { id } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      username: userDict.username,
      firstName: userDict.firstName,
      lastName: userDict.lastName,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated user (no updates)', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeUser.id}`)
      .send({ memberOf: [] });

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const anotherFakeUser = await buildUser({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeUser.id}`)
      .send({ username: anotherFakeUser.username });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.username).toBe(anotherFakeUser.username);

    const updatedUser = await User.findByPk(fakeUser.id);

    expect(updatedUser.username).toBe(anotherFakeUser.username);
  });

  test('/PATCH - User does not exists, user cant be updated', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { id } = fakeUser;
    const { username } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app)
      .patch(`${ENDPOINT}/${id}`)
      .send({ username });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeUser.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeUser.id);

    const deletedUser = await User.findByPk(fakeUser.id);
    expect(deletedUser).toBe(null);
  });

  test('/DELETE - User does not exists, user cant be deleted', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { id } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
