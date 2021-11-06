import Sequelize from 'sequelize';
import config from 'config';

import { projectModel } from './project.model';
import { taskModel } from './task.model';
import { teamModel } from './team.model';
import { userModel } from './user.model';

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
  }
);

taskModel(sequelize);
projectModel(sequelize);
userModel(sequelize);
teamModel(sequelize);

const { Task, Project, User, Team } = sequelize.models;

Task.associate(sequelize.models);
Project.associate(sequelize.models);
User.associate(sequelize.models);
Team.associate(sequelize.models);

if (process.env.NODE_ENV !== 'test' && !process.env.USE_MIGRATIONS) {
  sequelize.sync({ alter: true });
}

export { sequelize, Task, Project, User, Team };
