import { DataTypes, Sequelize } from 'sequelize';
import { taskStatusChoices } from 'server/utils/constants/fieldChoices';

const taskModel = (sequelize) => {
  const Task = sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 20],
        },
      },
      body: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 1000],
        },
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [taskStatusChoices],
        },
      },
      creation: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        validate: {
          isDate: true,
        },
      },
      priority: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      storyPoint: {
        type: DataTypes.FLOAT,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Task.associate = (models) => {
    Task.hasMany(models.Task, {
      foreignKey: { name: 'parentTask' },
      as: 'subtasks',
      constraints: false,
    });
    Task.belongsTo(models.Project, {
      foreignKey: { name: 'project', allowNull: false },
      as: 'project_',
    });
    Task.belongsTo(models.User, {
      foreignKey: { name: 'creator', allowNull: false },
      as: 'creator_',
    });
    Task.belongsTo(models.User, {
      foreignKey: { name: 'assignedPrimary', allowNull: false },
      as: 'assignedPrimary_',
    });
    Task.belongsTo(models.User, {
      foreignKey: { name: 'assignedSecondary' },
      as: 'assignedSecondary_',
      constraints: false,
    });
    Task.belongsTo(models.Task, {
      foreignKey: { name: 'parentTask' },
      as: 'parentTask_',
      constraints: false,
    });
  };
};

export { taskModel };
