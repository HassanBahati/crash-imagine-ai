import request from 'supertest';
import { Team } from 'data/models';
import { app } from 'server/app';
import { buildTeam, buildUser, createTeam, createUser } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/team';

describe('Team tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created team', async () => {
    const fakeTeam = await buildTeam({});

    const response = await request(app).post(ENDPOINT).send(fakeTeam);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseTeam = response.body.data;

    const team = await Team.findByPk(responseTeam.id);

    expect(team.name).toBe(fakeTeam.name);
  });

  test('/POST - Response with a new created team with many to many related models', async () => {
    const membersDict = await buildUser({});
    const fakeMembers = await createUser(membersDict);

    const fakeTeam = await buildTeam({ members: [fakeMembers.id] });

    const response = await request(app).post(ENDPOINT).send(fakeTeam);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseTeam = response.body.data;

    const team = await Team.findByPk(responseTeam.id, { include: ['members'] });

    expect(team.members[0].id).toBe(fakeMembers.id);
    expect(team.members.length).toBe(1);
  });

  test('/GET - Response with a team', async () => {
    const teamDict = await buildTeam({});
    const fakeTeam = await createTeam(teamDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeTeam.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeTeam.id);
    expect(data.name).toBe(fakeTeam.name);
  });
  test('/GET - Response with a team not found', async () => {
    const teamDict = await buildTeam({});
    const fakeTeam = await createTeam(teamDict);
    const { id } = fakeTeam;
    await fakeTeam.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of teams', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allTeam = await Team.findAll();
    expect(data.length).toBe(allTeam.length);
  });
  test('/PUT - Response with an updated team', async () => {
    const teamDict = await buildTeam({});
    const fakeTeam = await createTeam(teamDict);

    const anotherFakeTeam = await buildTeam({});

    const response = await request(app).put(`${ENDPOINT}/${fakeTeam.id}`).send({
      name: anotherFakeTeam.name,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(anotherFakeTeam.name);

    const updatedTeam = await Team.findByPk(fakeTeam.id);

    expect(updatedTeam.name).toBe(anotherFakeTeam.name);
  });

  test('/PUT - Team does not exists, team cant be updated', async () => {
    const teamDict = await buildTeam({});
    const fakeTeam = await createTeam(teamDict);
    const { id } = fakeTeam;
    await fakeTeam.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      name: teamDict.name,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated team (no updates)', async () => {
    const teamDict = await buildTeam({});
    const fakeTeam = await createTeam(teamDict);

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTeam.id}`)
      .send({ members: [] });

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/DELETE - Response with a deleted team', async () => {
    const teamDict = await buildTeam({});
    const fakeTeam = await createTeam(teamDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeTeam.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeTeam.id);

    const deletedTeam = await Team.findByPk(fakeTeam.id);
    expect(deletedTeam).toBe(null);
  });

  test('/DELETE - Team does not exists, team cant be deleted', async () => {
    const teamDict = await buildTeam({});
    const fakeTeam = await createTeam(teamDict);
    const { id } = fakeTeam;
    await fakeTeam.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
