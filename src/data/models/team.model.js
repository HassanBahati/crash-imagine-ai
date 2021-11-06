import { DataTypes } from 'sequelize';

const teamModel = (sequelize) => {
  const Team = sequelize.define(
    'Team',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 80],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  Team.associate = (models) => {
    Team.belongsToMany(models.User, { as: 'members', through: 'TeamMembers' });
  };
};

export { teamModel };
