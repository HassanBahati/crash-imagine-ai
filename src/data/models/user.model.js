import { DataTypes } from 'sequelize';

const userModel = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 80],
        },
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 80],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 80],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Task, {
      foreignKey: { name: 'creator', allowNull: false },
      as: 'createdTasks',

      onDelete: 'cascade',
    });
    User.hasMany(models.Task, {
      foreignKey: { name: 'assignedPrimary', allowNull: false },
      as: 'assignedTasksPrimary',

      onDelete: 'cascade',
    });
    User.hasMany(models.Task, {
      foreignKey: { name: 'assignedSecondary' },
      as: 'assignedTasksSecondary',
      constraints: false,
    });
    User.hasMany(models.Project, {
      foreignKey: { name: 'creator', allowNull: false },
      as: 'createdProjects',

      onDelete: 'cascade',
    });
    User.belongsToMany(models.Team, { as: 'memberOf', through: 'TeamMembers' });
  };
};

export { userModel };
