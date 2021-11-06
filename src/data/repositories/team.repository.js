import { Team } from 'data/models';
import { NotFound } from 'server/utils/errors';

class TeamRepository {
  static async create(name, members) {
    const createdTeam = await Team.create({
      name,
    });

    if (members) await createdTeam.setMembers(members);

    return createdTeam;
  }

  static get(id) {
    return Team.findByPk(id, { include: ['members'] });
  }

  static getAll(filters) {
    return Team.findAll({
      where: filters,
      include: ['members'],
    });
  }

  static async update(id, name, members) {
    return this.partialUpdate({
      id,
      name,
      members,
    });
  }

  static async partialUpdate({ id, name, members }) {
    const foundTeam = await Team.findByPk(id);
    if (!foundTeam) throw new NotFound(`Team with primary key ${id} not found`);
    if (name !== undefined) foundTeam.name = name;
    if (members !== undefined) await foundTeam.setMembers(members);
    await foundTeam.save();
    return foundTeam.reload();
  }

  static async destroy(id) {
    const foundTeam = await Team.findByPk(id);
    if (!foundTeam) throw new NotFound(`Team with primary key ${id} not found`);
    await foundTeam.destroy();
    return foundTeam;
  }
}

export { TeamRepository };
