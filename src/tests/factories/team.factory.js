import { random } from 'faker';
import { Team } from 'data/models';

const buildTeam = async (teamFks) => {
  const resTeam = {};

  resTeam.name = random.word().slice(0, 80);

  if (teamFks.members !== null || typeof teamFks.members !== 'undefined') {
    resTeam.members = teamFks.members;
  }

  return resTeam;
};

const createTeam = async (fakeTeam) => {
  const team = await Team.create(fakeTeam);
  return team;
};

export { buildTeam, createTeam };
