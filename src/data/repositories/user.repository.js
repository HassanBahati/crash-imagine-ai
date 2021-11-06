import { User } from 'data/models';
import { NotFound } from 'server/utils/errors';

class UserRepository {
  static async create(username, firstName, lastName, memberOf) {
    const createdUser = await User.create({
      username,
      firstName,
      lastName,
    });

    if (memberOf) await createdUser.setMemberOf(memberOf);

    return createdUser;
  }

  static get(id) {
    return User.findByPk(id, {
      include: [
        'createdTasks',
        'assignedTasksPrimary',
        'assignedTasksSecondary',
        'createdProjects',
        'memberOf',
      ],
    });
  }

  static getAll(filters) {
    return User.findAll({
      where: filters,
      include: [
        'createdTasks',
        'assignedTasksPrimary',
        'assignedTasksSecondary',
        'createdProjects',
        'memberOf',
      ],
    });
  }

  static async update(id, username, firstName, lastName, memberOf) {
    return this.partialUpdate({
      id,
      username,
      firstName,
      lastName,
      memberOf,
    });
  }

  static async partialUpdate({ id, username, firstName, lastName, memberOf }) {
    const foundUser = await User.findByPk(id);
    if (!foundUser) throw new NotFound(`User with primary key ${id} not found`);
    if (username !== undefined) foundUser.username = username;
    if (firstName !== undefined) foundUser.firstName = firstName;
    if (lastName !== undefined) foundUser.lastName = lastName;
    if (memberOf !== undefined) await foundUser.setMemberOf(memberOf);
    await foundUser.save();
    return foundUser.reload();
  }

  static async destroy(id) {
    const foundUser = await User.findByPk(id);
    if (!foundUser) throw new NotFound(`User with primary key ${id} not found`);
    await foundUser.destroy();
    return foundUser;
  }
}

export { UserRepository };
